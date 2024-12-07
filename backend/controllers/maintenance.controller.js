const Maintenance = require("../models/maintenance.model");
const Resident = require("../models/resident.model");
const Notification = require("../models/notification.model");
const Admin = require("../models/admin.model");
const Razorpay = require("razorpay");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const addMaintenance = async (req, res) => {
  try {
    const { amount, penaltyAmount, dueDate, penaltyDay } = req.body;

    const users = await Resident.find();
    const memberRecords = users.map((user) => ({
      user: user._id,
      status: "pending",
      paymentMethod: "cash",
    }));

    const maintenance = new Maintenance({
      amount,
      penaltyAmount,
      dueDate,
      penaltyDay,
      member: memberRecords,
    });

    const savedMaintenance = await maintenance.save();

    const populatedMaintenance = await Maintenance.findById(
      savedMaintenance._id
    )
      .populate("member.user", "fullName profile_picture wing unit phone role")
      .exec();

    // for notification
    const notificationUsers = [
      ...(await Resident.find().select("_id")).map(({ _id }) => ({
        _id,
        model: "Resident",
      })),
      ...(await Admin.find().select("_id")).map(({ _id }) => ({
        _id,
        model: "Admin",
      })),
    ];
    const newNotification = await new Notification({
      title: "New Maintenance Created",
      name: "Annual Maintenance",
      message: `Per Person Amount : ₹${amount} and dueDate is: ${dueDate}`,
      users: notificationUsers,
    }).save();

    res.status(200).json({
      data: populatedMaintenance,
      notification: newNotification,
      message: "Maintenance record created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating maintenance record",
      error: error.message,
    });
  }
};

const getStatus = async (req, res) => {
  try {
    const { status } = req.params;

    if (status !== "pending" && status !== "done") {
      return res.status(404).json({ message: "Invalid status value" });
    }

    const response = await Maintenance.find({
      "member.status": status,
    })
      .populate({
        path: "member.user",
        select: "fullName profile_picture wing unit phone role email",
      })
      .exec();

    const filteredMembers = response.flatMap((record) =>
      record.member
        .filter((member) => member.status === status)
        .map((member) => ({
          ...member.toObject(),
          penaltyDay: record.penaltyDay,
          amount: record.amount,
          penaltyAmount: record.penaltyAmount,
        }))
    );

    res.status(200).json(filteredMembers);
  } catch (error) {
    console.error("Get status controller error:", error);
    res
      .status(500)
      .json({ message: "Error fetching status data", error: error.message });
  }
};

const getAllStatus = async (req, res) => {
  try {
    const allMaintenance = await Maintenance.find()
      .populate({
        path: "member.user",
        select: "fullName profile_picture wing unit phone role",
      })
      .exec();

    res.status(200).json(allMaintenance);
  } catch (error) {
    console.log("Get all maintenance error:", error);
    res.status(500).json({
      message: "Error fetching all maintenance data",
      error: error.message,
    });
  }
};

const getPendingMaintenanceByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const maintenanceRecords = await Maintenance.find({
      "member.user": userId,
      "member.status": "pending",
    });

    const filteredRecords = maintenanceRecords
      .map((record) => {
        const member = record.member.find(
          (m) => m.user.toString() === userId && m.status === "pending"
        );
        return member ? { ...record.toObject(), member: [member] } : null;
      })
      .filter(Boolean);

    // if (!filteredRecords.length) {
    //   return res.status(404).json({ message: 'No pending maintenance records found for this user' });
    // }

    res.status(200).json(filteredRecords);
  } catch (error) {
    console.error("Error fetching pending maintenance for user:", error);
    res.status(500).json({
      message: "Error fetching pending maintenance records",
      error: error.message,
    });
  }
};

const applyPenalties = async () => {
  // try {
  //   const today = new Date();
  //   const maintenanceRecords = await Maintenance.find({
  //     "member.status": "pending",
  //     penaltyDay: { $lte: today },
  //   });
  //   const updatePromises = maintenanceRecords.map(async (record) => {
  //     const updatedMembers = record.member.map((member) => {
  //       if (member.status === "pending") {
  //         record.amount += record.penaltyAmount;
  //         return {
  //           ...member,
  //           // amount: record.amount + record.penaltyAmount,
  //         };
  //       }
  //       return member;
  //     });
  //     return Maintenance.findByIdAndUpdate(
  //       record._id,
  //       { $set: { amount: record.amount, member: updatedMembers } },
  //       { new: true }
  //     );
  //   });
  //   await Promise.all(updatePromises);
  //   console.log("Penalties applied to overdue maintenance records.");
  // } catch (error) {
  //   console.error("Error applying penalties:", error);
  // }
};

const createOrder = async (req, res) => {
  const { amount, userId, paymentMethod } = req.body;
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `order_rcptid_${new Date().getTime()}`,
      notes: { userId, paymentMethod },
    });

    res.status(200).json({
      order,
      razorpayKey: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ message: "Error creating order." });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, maintenanceId, userId, paymentMethod } = req.body;
    const body = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY) 
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    const maintenance = await Maintenance.findById(maintenanceId);

    if (!maintenance) {
      return res.status(404).json({ message: "Maintenance record not found" });
    }

    const member = maintenance.member.find(m => m.user.toString() === userId);

    if (!member) {
      return res.status(404).json({ message: "User not found in maintenance record" });
    }

    member.status = "done";
    member.paymentMethod = paymentMethod;

    await maintenance.save();

    res.status(200).json({
      message: "Payment verified and maintenance record updated successfully",
      data: maintenance,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Error verifying payment", error: error.message });
  }
};


const paymentForMaintenance = async (req, res) => {
  try {
    const { maintenanceId } = req.params;
    const { userId, paymentMethod } = req.body;

    if (!userId || !maintenanceId || !paymentMethod) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const maintenance = await Maintenance.findById(maintenanceId);

    if (!maintenance) {
      return res.status(404).json({ message: "Maintenance record not found." });
    }

    const member = maintenance.member.find((m) => m.user.toString() === userId);

    if (!member) {
      return res
        .status(404)
        .json({ message: "Admin not found in maintenance record." });
    }

    member.status = "done";
    member.paymentMethod = paymentMethod;

    await maintenance.save();

      res.status(200).json({
        message: "Payment status updated successfully.",
        data: maintenance,
      });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({
      message: "Error updating payment status.",
      error: error.message,
    });
  }
};

const getTotalAmount = async (req, res) => {
  try {
    const maintenanceRecords = await Maintenance.find().populate(
      "member.user",
      "fullName"
    );

    const totalAmount = maintenanceRecords.reduce((total, record) => {
      const doneMembers = record.member.filter((m) => m.status === "done");
      return total + doneMembers.length * record.amount;
    }, 0);

    res.status(200).json({
      message: "Total amount calculated successfully.",
      totalAmount,
    });
  } catch (error) {
    console.error("Error calculating total amount:", error);
    res.status(500).json({
      message: "Error calculating total amount.",
      error: error.message,
    });
  }
};

const generateInvoicePDF = async (req, res) => {
  const { invoice } = req.body;
  console.log(req.body);

  if (!invoice) {
    return res.status(400).send("Invoice data is required.");
  }

  const doc = new PDFDocument();
  const filePath = path.join(__dirname, `invoice-${invoice._id}.pdf`);

  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);
  doc.fontSize(20).text("Maintenance Invoice", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Invoice ID: ${invoice._id.substring(0, 8)}`);
  doc.text(`Owner Name: ${invoice.user.fullName}`);
  doc.text(`Phone Number: ${invoice.user.phone}`);
  doc.text(`Email: ${invoice.user.email}`);
  doc.moveDown();
  doc.text(
    `Bill Date: ${new Date(invoice.penaltyDay).toLocaleDateString("en-GB")}`
  );
  doc.text(
    `Payment Date: ${new Date(invoice.penaltyDay).toLocaleDateString("en-GB")}`
  );
  doc.moveDown();
  doc.text(`Maintenance Amount: ₹${invoice.amount}`);
  doc.text(
    `Penalty: ₹${
      new Date() >= new Date(invoice.penaltyDay) ? invoice.penaltyAmount : "00"
    }`
  );
  doc.moveDown();
  const grandTotal =
    new Date() >= new Date(invoice.penaltyDay)
      ? invoice.penaltyAmount + invoice.amount
      : invoice.amount;
  doc.text(`Grand Total: ₹${grandTotal}`, { align: "right" });
  doc.moveDown();
  doc.text("Note:");
  doc.text(
    "A visual representation of your spending categories visual representation.",
    { align: "justify" }
  );

  doc.end();

  writeStream.on("finish", () => {
    res.download(filePath, `invoice-${invoice._id}.pdf`, (err) => {
      if (err) console.error(err);
      fs.unlinkSync(filePath);
    });
  });
};

module.exports = {
  addMaintenance,
  getStatus,
  getAllStatus,
  getPendingMaintenanceByUser,
  createOrder,
  verifyPayment,
  paymentForMaintenance,
  applyPenalties,
  getTotalAmount,
  generateInvoicePDF,
};
