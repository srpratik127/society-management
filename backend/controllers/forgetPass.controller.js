const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const Admin = require("../models/admin.model");
// const cookieParser = require("cookie-parser");
const Resident = require("../models/resident.model");
const Guard = require("../models/guard.model");

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();
const otpStore = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "maulik.rasadiya@swiftrut.com",
    pass: "iruqfffzzazzlynr",
  },
});

const otpmail = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await Admin.findOne({ email });

    if (!user) {
      user = await Resident.findOne({ email });
    }

    if (!user) {
      user = await Guard.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }
    const otp = generateOTP();
    otpStore[email] = { otp, expiresAt: Date.now() + 3 * 60 * 1000 };
    const mailOptions = {
      from: "maulik.rasadiya@swiftrut.com",
      to: email,
      subject: "Your OTP Code",
      html: `<h1><img src="https://res.cloudinary.com/dwvfquvxy/image/upload/f_auto,q_auto/bwlmo07am1aio3ppkty0" alt="logo" /></h1><h3>welcome to DashStack</h3><p>Your OTP is: ${otp}</p>`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

const verifyOTP = (req, res) => {
  try {
    const { otp, email } = req.body;
    const storedOtpInfo = otpStore[email];
    if (!storedOtpInfo || storedOtpInfo.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired or not found" });
    }
    if (otp === storedOtpInfo.otp) {
      delete otpStore[email];
      res.status(200).json({ message: "OTP verified successfully!" });
    } else {
      res.status(401).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password, email } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = await Admin.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      user = await Resident.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
    }

    if (!user) {
      user = await Guard.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
    }

    if (!user) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  otpmail,
  verifyOTP,
  resetPassword,
};
