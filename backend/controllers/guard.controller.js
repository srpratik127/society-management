const Guard = require("../models/guard.model.js");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');
const { log } = require("console");

const createGuard = async (req, res) => {
    try {
        const { fullName, phoneNumber, gender, shift, shiftDate, shiftTime, email } = req.body;
        let profilePictureUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKc08Wq1A-TIERnJUrHsmF9Asnmz5f_EnD5Mr8kQsJNZCdHjg_medKyoo&s";
        let aadharCardUrl = '';

        if (req.files && req.files['profile_photo']) {
            const profilePhoto = req.files['profile_photo'][0];
            const result = await cloudinary.uploader.upload(profilePhoto.path, {
                folder: "Security_Guard_Picture",
            });
            profilePictureUrl = result.secure_url;
            fs.unlink(profilePhoto.path, (err) => {
                if (err) console.error("Error deleting profile photo:", err);
            });
        }

        if (req.files && req.files['aadhar_card']) {
            const aadharCard = req.files['aadhar_card'][0];
            const result = await cloudinary.uploader.upload(aadharCard.path, {
                folder: "Security_Guard_AadharCard",
            });
            aadharCardUrl = result.secure_url;
            fs.unlink(aadharCard.path, (err) => {
                if (err) console.error("Error deleting aadhar card:", err);
            });
        }

        const randomPassword = crypto.randomBytes(4).toString('hex');
        const hashedPassword = await bcrypt.hash(randomPassword, 10);
        const newGuard = new Guard({
            profile_photo: profilePictureUrl,
            fullName,
            phoneNumber,
            gender,
            shift,
            shiftDate,
            shiftTime,
            aadhar_card: aadharCardUrl,
            email,
            password: hashedPassword, 
        });

        await newGuard.save();
        
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: 'maulikpatel4334@gmail.com',
                pass:'hxwhiahgwrleixqz',
            },
        });

        const mailOptions = {
            from:'maulikpatel4334@gmail.com' ,
            to: email,
            subject: 'Sending Your Password',
            html:  `<h1>DashStack</h1><p>Your Password is: ${randomPassword}</p>`,
        };

        await transporter.sendMail(mailOptions);
        res.status(201).json({ message: 'Security guard created and password sent to email', data: newGuard});
    } catch (error) {
        res.status(500).json({ message: 'Error creating Guard', error: error.message });
    }
};

const getGuard = async (req, res) => {
    try {
        const data = await Guard.find();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: 'Get Guard controller error' })
    }
};

const updateGuard = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, phoneNumber, gender, shift, shiftDate, shiftTime } = req.body;
        console.log(id);

        if (!fullName || !phoneNumber || !gender || !shift || !shiftDate || !shiftTime) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        let profilePictureUrl = '';
        if (req.files?.['profile_photo']) {
            const profilePhoto = req.files['profile_photo'][0];
            const result = await cloudinary.uploader.upload(profilePhoto.path, {
                folder: "Security_Guard_Picture",
            });
            profilePictureUrl = result.secure_url;
            fs.unlink(profilePhoto.path, (err) => {
                if (err) console.error("Error deleting profile photo:", err);
            });
        }
        const updatedGuard = await Guard.findByIdAndUpdate(
            id,
            {
                profile_photo: profilePictureUrl || req.body.profile_photo,  
                fullName,
                phoneNumber,
                gender,
                shift,
                shiftDate,
                shiftTime,
            },
            { new: true, runValidators: true }
        );
        if (!updatedGuard) {
            return res.status(404).json({ message: "Guard not found" });
        }
        res.status(200).json({ message: "Guard updated successfully", data: updatedGuard });
    } catch (error) {
        res.status(500).json({ message: "Error updating Guard", error: error.message });
    }
};

const deleteGuard = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedGuard = await Guard.findByIdAndDelete(id);
        if (!deletedGuard) {
            return res.status(404).json({ message: "Guard not found" });
        }
        res.status(200).json({ message: "Guard deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Guard", error: error.message });
    }
};

module.exports = {
    createGuard,
    getGuard,
    updateGuard,
    deleteGuard
};
