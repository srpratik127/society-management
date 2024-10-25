const express = require('express');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
app.use(express.json());

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// In-memory store for OTPs
const otpStore = new Map();  // Key: contactInfo (email/phone), Value: { otp, expiresAt }

// Generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP via email
const sendOTPToEmail = (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  return transporter.sendMail(mailOptions);
};

// Send OTP via phone (SMS)
const sendOTPToPhone = (phone, otp) => {
  return twilioClient.messages.create({
    body: `Your OTP code is ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone,
  });
};

// Function to determine if input is an email
const isEmail = (input) => /\S+@\S+\.\S+/.test(input);

// Function to determine if input is a valid phone number
const isPhoneNumber = (input) => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Matches international phone formats
  return phoneRegex.test(input);
};

// Forget Password API (Send OTP)
app.post('/forget-password', async (req, res) => {
  const { contactInfo } = req.body;

  try {
    // Determine whether contactInfo is an email or phone number
    if (isEmail(contactInfo)) {
      // Search by email
      user = await User.findOne({ email: contactInfo });
    } else if (isPhoneNumber(contactInfo)) {
      // Search by phone number
      user = await User.findOne({ phone: contactInfo });
    } else {
      return res.status(400).json({ message: 'Invalid email or phone number format' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate OTP and expiration time (10 minutes from now)
    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000;  // 10 minutes in milliseconds

    // Send OTP via email or phone
    if (isEmail(contactInfo)) {
      await sendOTPToEmail(user.email, otp);
    } else {
      await sendOTPToPhone(user.phone, otp);
    }

    // Store OTP in the in-memory store
    otpStore.set(contactInfo, { otp, expiresAt });

    // Set up OTP expiration after 10 minutes
    setTimeout(() => {
      otpStore.delete(contactInfo);
    }, 10 * 60 * 1000);  // 10 minutes

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending OTP', error });
  }
});

// Verify OTP API
app.post('/verify-otp', async (req, res) => {
  const { contactInfo, otp } = req.body;

  try {
    // Check if OTP exists for the given contactInfo
    const storedOTP = otpStore.get(contactInfo);

    if (!storedOTP) {
      return res.status(400).json({ message: 'OTP expired or not found' });
    }

    // Check if the OTP is valid
    if (storedOTP.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Check if the OTP is expired
    if (Date.now() > storedOTP.expiresAt) {
      otpStore.delete(contactInfo);  // Clean up expired OTP
      return res.status(400).json({ message: 'OTP expired' });
    }

    // OTP is valid and not expired
    otpStore.delete(contactInfo);  // Clean up after successful verification
    res.status(200).json({ message: 'OTP verified successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
