const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const cookieParser = require('cookie-parser');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'maulikpatel4334@gmail.com',
    pass: 'hxwhiahgwrleixqz', 
  },
});

const otpmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const otp = generateOTP();

    const mailOptions = {
      from: "maulikpatel4334@gmail.com",
      to: email,
      subject: "Your OTP Code",
      html: `<h1>DashStack</h1><p>Your OTP is: ${otp}</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.cookie("otp", { otp, email, verified: false }, { httpOnly: true, maxAge: 10 * 60 * 1000 });
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
};


const verifyOTP = (req, res) => {
  try {
    const userInputOtp = req.body.otp;
    const cookieOtp = req.cookies.otp?.otp; 

    if (!cookieOtp) {
      return res.status(400).json({ message: "No OTP found in cookies" });
    }

    if (userInputOtp === cookieOtp) {
      res.cookie("otp", { ...req.cookies.otp, verified: true }, { httpOnly: true, maxAge: 10 * 60 * 1000 });
      res.status(200).json({ message: "OTP verified successfully!" });
    } else {
      res.status(401).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    const otpCookie = req.cookies.otp;

    if (!otpCookie || !otpCookie.verified) {
      return res.status(401).json({ message: "OTP verification required" });
    }

    if (!password) {
      return res.status(400).json({ message: "Passwords is mendatory" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findOneAndUpdate(
      { email: otpCookie.email },
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.clearCookie("otp");
    res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    console.error("Error resetting password:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  otpmail,
  verifyOTP,
  resetPassword,
};
