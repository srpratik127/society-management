const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Resident = require('../models/resident.model');
const generateTempPassword = () => {
  return crypto.randomBytes(4).toString('hex'); 
};
const sendTempPasswordEmail = async (email, tempPassword) => {
  let transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: 'maulikpatel4334@gmail.com',
      pass: 'hxwhiahgwrleixqz', 
    },
  });
  const mailOptions = {
    from: "maulikpatel4334@gmail.com",
    to: email,
    subject: "Sending Your Password",
    html: `<h1>DashStack</h1><p>Your Password is: ${tempPassword}</p>`,
  };
  return transporter.sendMail(mailOptions);
};

const createOwner = async (req, res) => {
  try {
    const { email,societyId  } = req.body;
    const existingResident = await Resident.findOne({ email });
    if (existingResident) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists.',
      });
    }
    const tempPassword = generateTempPassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    const newResident = await Resident.create({
      ...req.body,
      password: hashedPassword,
      otp: tempPassword,
      societyId,  
    });
    await sendTempPasswordEmail(email, tempPassword);
    const { password, otp, ...residentWithoutPassword } = newResident.toObject();
    res.status(201).json({
      success: true,
      message: 'Resident created. Temporary password send to email.',
      data: residentWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOwners = async (req, res) => {
  try {
    const owners = await Resident.find();
    res.status(200).json({
      success: true,
      data: owners
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getOwnerById = async (req, res) => {
  try {
    const owner = await Resident.findById(req.params.id);
    if (!owner) {
      return res.status(404).json({
        success: false,
        message: 'Owner not found'
      });
    }
    res.status(200).json({
      success: true,
      data: owner
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const vacateflat = async (req, res) => {
  try {
    const owner = await Resident.findById(req.params.id);

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: 'Owner not found',
      });
    }
    owner.residenceStatus = 'Vacate';
    await owner.save();
    const responseData = {
      wing: owner.wing,
      unit: owner.unit,
      residenceStatus: owner.residenceStatus,
    };
    res.status(200).json({
      success: true,
      message: 'Unit marked as vacant',
      data: responseData, 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createOwner,
  getOwners,
  getOwnerById,
  vacateflat
};
