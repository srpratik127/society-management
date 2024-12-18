const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Resident = require("../models/resident.model");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const path = require("path");

const generateTempPassword = () => {
  return crypto.randomBytes(4).toString("hex");
};
const sendTempPasswordEmail = async (email, tempPassword) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "maulik.rasadiya@swiftrut.com",
      // pass: "bilvlipbgxhsslev",
      pass: "iruqfffzzazzlynr",
    },
  });
  const mailOptions = {
    from: "maulik.rasadiya@swiftrut.com",
    to: email,
    subject: "Sending Your Password",
    html: `<h1><img src="https://res.cloudinary.com/dwvfquvxy/image/upload/f_auto,q_auto/bwlmo07am1aio3ppkty0" alt="logo" /></h1><h3>welcome to DashStack</h3><p>Your Password is: ${tempPassword}</p>`,
  };
  return transporter.sendMail(mailOptions);
};

const createOwner = async (req, res) => {
  try {
    const { email } = req.body;
    const existingResident = await Resident.findOne({ email });
    if (existingResident) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    const validVehicles = req.body.vehicles.filter(
      (vehicle) =>
        vehicle.vehicleType === "Two Wheeler" ||
        vehicle.vehicleType === "Four Wheeler"
    );

    const tempPassword = generateTempPassword();
    await sendTempPasswordEmail(email, tempPassword);
    const uploadToCloudinary = async (filePath, folder) => {
      const result = await cloudinary.uploader.upload(filePath, {
        folder,
      });
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting local file:", err);
        }
      });
      return result.secure_url;
    };
    const profilePictureUrl = req.files?.profile_picture
      ? await uploadToCloudinary(
          req.files.profile_picture[0].path,
          "profile_pictures"
        )
      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKc08Wq1A-TIERnJUrHsmF9Asnmz5f_EnD5Mr8kQsJNZCdHjg_medKyoo&s";
    const aadharCardFrontUrl = req.files?.aadharCardFront
      ? await uploadToCloudinary(
          req.files.aadharCardFront[0].path,
          "aadhar_cards"
        )
      : null;
    const aadharCardBackUrl = req.files?.aadharCardBack
      ? await uploadToCloudinary(
          req.files.aadharCardBack[0].path,
          "aadhar_cards"
        )
      : null;
    const addressProofUrl = req.files?.addressProof
      ? await uploadToCloudinary(
          req.files.addressProof[0].path,
          "address_proofs"
        )
      : null;
    const rentAgreementUrl = req.files?.rentAgreement
      ? await uploadToCloudinary(
          req.files.rentAgreement[0].path,
          "rent_agreements"
        )
      : null;
    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    const newResident = await Resident.create({
      ...req.body,
      password: hashedPassword,
      otp: tempPassword,
      vehicles: validVehicles,
      profile_picture: profilePictureUrl,
      aadharCardFront: aadharCardFrontUrl,
      aadharCardBack: aadharCardBackUrl,
      addressProof: addressProofUrl,
      rentAgreement: rentAgreementUrl,
    });
    const { password, otp, ...residentWithoutPassword } =
      newResident.toObject();
    res.status(201).json({
      success: true,
      message:
        "Resident created successfully. Temporary password sent to email.",
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
      data: owners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOwnerById = async (req, res) => {
  try {
    const owner = await Resident.findById(req.params.id);
    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner not found",
      });
    }
    res.status(200).json({
      success: true,
      data: owner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateOwner = async (req, res) => {
  try {
    const ownerId = req.params.id;
    const { email } = req.body;
    const owner = await Resident.findById(ownerId);
    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner not found",
      });
    }
    if (email && email !== owner.email) {
      const existingResident = await Resident.findOne({ email });
      if (existingResident) {
        return res.status(400).json({
          success: false,
          message: "Email already in use by another resident",
        });
      }
    }

    const uploadToCloudinary = async (filePath, folder) => {
      const result = await cloudinary.uploader.upload(filePath, { folder });
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting local file:", err);
      });
      return result.secure_url;
    };
    if (req.files) {
      if (req.files.profile_picture) {
        owner.profile_picture = await uploadToCloudinary(
          req.files.profile_picture[0].path,
          "profile_pictures"
        );
      }
      if (req.files.aadharCardFront) {
        owner.aadharCardFront = await uploadToCloudinary(
          req.files.aadharCardFront[0].path,
          "aadhar_cards"
        );
      }
      if (req.files.aadharCardBack) {
        owner.aadharCardBack = await uploadToCloudinary(
          req.files.aadharCardBack[0].path,
          "aadhar_cards"
        );
      }
      if (req.files.addressProof) {
        owner.addressProof = await uploadToCloudinary(
          req.files.addressProof[0].path,
          "address_proofs"
        );
      }
      if (req.files.rentAgreement) {
        owner.rentAgreement = await uploadToCloudinary(
          req.files.rentAgreement[0].path,
          "rent_agreements"
        );
      }
    }
    Object.assign(owner, req.body);
    const updatedOwner = await owner.save();
    const { password, otp, ...ownerWithoutSensitiveData } =
      updatedOwner.toObject();
    res.status(200).json({
      success: true,
      message: "Owner updated successfully",
      data: ownerWithoutSensitiveData,
    });
  } catch (error) {
    console.error("Error in updateOwner:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const vacateflat = async (req, res) => {
  try {
    const owner = await Resident.findById(req.params.id);
    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner not found",
      });
    }
    owner.residenceStatus = "Vacate";
    owner.email = "";
    await owner.save();
    const responseData = {
      wing: owner.wing,
      unit: owner.unit,
      residenceStatus: owner.residenceStatus,
    };
    res.status(200).json({
      success: true,
      message: "Unit marked as vacant",
      data: responseData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOccupiedOwners = async (req, res) => {
  try {
    const occupiedOwners = await Resident.find({ residenceStatus: "Occupied" });
    res.status(200).json({
      success: true,
      data: occupiedOwners,
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
  updateOwner,
  vacateflat,
  getOccupiedOwners,
};
