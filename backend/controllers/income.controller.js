const Income = require("../models/income.model");
const Notification = require("../models/notification.model");
const Resident = require("../models/resident.model");
const User = require("../models/user.model");

const createIncome = async (req, res) => {
  try {
    const { title, date, dueDate, description, amount } = req.body;
    const newIncome = new Income({
      title,
      date,
      dueDate,
      description,
      amount,
    });
    const savedIncome = await newIncome.save();
    const users = [
      ...(await Resident.find().select("_id")).map(({ _id }) => ({
        _id,
        model: "Resident",
      })),
      ...(await User.find().select("_id")).map(({ _id }) => ({
        _id,
        model: "User",
      })),
    ];
    const newNotification = await new Notification({
      title: "New Income Created",
      name: title,
      message: `Per Person Amount : ₹${amount}
      A new income "${title}" has been created. `,
      users,
    }).save();

    res.status(201).json({
      data: savedIncome,
      notification: newNotification,
      message: "Income created successfully and notification sent.",
    });
  } catch (error) {
    console.error("Error creating income:", error);
    res
      .status(500)
      .json({ message: "Error creating Income", error: error.message });
  }
};

const getIncome = async (req, res) => {
  try {
    const data = await Income.find().populate(
      "members.user",
      "fullName profile_picture wing unit role phone"
    );
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Get Income controller error", error: error.message });
  }
};

const updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, dueDate, description, amount } = req.body;
    const updatedIncome = await Income.findByIdAndUpdate(
      id,
      { title, date, dueDate, description, amount },
      { new: true, runValidators: true }
    );
    if (!updatedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }
    res
      .status(200)
      .json({ message: "Income updated successfully", data: updatedIncome });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating Income", error: error.message });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedIncome = await Income.findByIdAndDelete(id);
    if (!deletedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Income", error: error.message });
  }
};

const addMemberToIncome = async (req, res) => {
  try {
    const { user, payAmount, paymentMethod } = req.body;
    const income = await Income.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          members: {
            user: user,
            paymentMethod: paymentMethod,
            payAmount: payAmount,
            status: "done",
          },
        },
      },
      { new: true }
    ).populate("members.user", "fullName wing unit role phone");
    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income event not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Member added successfully to the income event",
      data: income,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while adding member",
      error: error.message,
    });
  }
};

const getIncomeExcludingMembers = async (req, res) => {
  try {
    const { userId } = req.params;

    // 1. userId is not in members.user
    // 2. dueDate is in the past  -- not applied
    const incomes = await Income.find({
      $and: [
        { "members.user": { $ne: userId } },
        // { dueDate: { $lt: new Date() } },
      ],
    }).select("-members");

    res.status(200).json({
      success: true,
      data: incomes,
    });
  } catch (error) {
    console.error("Error fetching incomes:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching incomes",
      error: error.message,
    });
  }
};

module.exports = {
  createIncome,
  getIncome,
  updateIncome,
  getIncomeExcludingMembers,
  deleteIncome,
  addMemberToIncome,
};
