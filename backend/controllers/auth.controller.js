const Admin = require("../models/admin.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Resident = require("../models/resident.model");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const Society = require("../models/society.model");
const Guard = require("../models/guard.model");

const Register = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      phone,
      country,
      state,
      city,
      select_society,
    } = req.body;

    const society = await Society.findById(select_society);
    if (!society) {
      return res.status(404).json({ msg: "Society not found" });
    }

    if (!password) {
      return res.status(400).json({ msg: "Passwords is mandatory" });
    }

    let user = await Admin.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "Admin already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const newUser = new Admin({
      firstname,
      lastname,
      email,
      phone,
      country,
      state,
      city,
      select_society: society,
      password: hashpassword,
    });

    await newUser.save();
    res.status(201).json({ msg: "Admin registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await Admin.findOne({ email });

    if (!user) {
      user = await Resident.findOne({ email });
    }

    if (!user) {
      user = await Guard.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ msg: "email not exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "password do not match" });
    }
    const { password: _, ...userWithoutPassword } = user.toObject();
    const token = jwt.sign(
      { user: userWithoutPassword },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    res.status(200).json({ msg: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstname,
      lastname,
      email,
      phone,
      country,
      state,
      city,
      select_society,
      profile_picture,
    } = req.body;
    const user = await Admin.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    let profilePictureUrl = profile_picture;
    if (req.file) {
      if (
        user.profile_picture &&
        user.profile_picture.includes("cloudinary.com")
      ) {
        const publicIdWithExtension = user.profile_picture.split("/").pop();
        const oldProfilePicturePublicId = `profile_pictures/${
          publicIdWithExtension.split(".")[0]
        }`;
        await cloudinary.uploader.destroy(
          oldProfilePicturePublicId,
          (error, result) => {
            if (error) {
              console.error("Error deleting old image from Cloudinary:", error);
            } else {
              console.log("Old image deleted from Cloudinary:", result);
            }
        });
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "profile_pictures",
      });
      profilePictureUrl = result.secure_url;
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error("Error deleting the file from local storage:", err);
        } else {
          console.log("File deleted successfully from local storage");
        }
      });
    }
    let parsedSociety = select_society;
    if (typeof select_society === "string") {
      try {
        parsedSociety = JSON.parse(select_society);
      } catch (err) {
        return res.status(400).json({ msg: "Invalid select_society format" });
      }
    }
    if (parsedSociety && parsedSociety._id) {
      await Society.findByIdAndUpdate(parsedSociety._id, {
        name: parsedSociety.name,
      });
    }

    const updatedUser = await Admin.findByIdAndUpdate(
      id,
      {
        firstname,
        lastname,
        email,
        phone,
        country,
        state,
        city,
        select_society: parsedSociety._id,
        profile_picture: profilePictureUrl,
      },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    const { password: _, ...userWithoutPassword } = updatedUser.toObject();
    const token = jwt.sign(
      { user: userWithoutPassword },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    if (!token) {
      return res.status(400).json({ msg: "Token generation failed" });
    }
    res.status(200).json({
      msg: "User updated successfully",
      user: updatedUser,
      token,
    });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

const verifyPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email not found.",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Password is correct.",
    });
  } catch (error) {
    console.error("Error in checkPassword:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error,",
    });
  }
};

module.exports = {
  Register,
  Login,
  updateUser,
  verifyPassword,
};
