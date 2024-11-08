const Guard = require("../models/guard.model.js");
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

const createGuard = async (req, res) => {
    try {
        const { profile_photo, fullName, phoneNomber, gender, shift, shiftDate, shiftTime, aadhar_card } = req.body;
        let profilePictureUrl = '';
        let aadharCardUrl = '';
        if (req.files['profile_photo']) {
            const profilePhoto = req.files['profile_photo'][0];
            const result = await cloudinary.uploader.upload(profilePhoto.path, {
                folder: "Security_Guard_Picture",
            });
            profilePictureUrl = result.secure_url;
            fs.unlink(profilePhoto.path, (err) => {
                if (err) console.error("Error deleting profile photo:", err);
            });
        }

        if (req.files['aadhar_card']) {
            const aadharCard = req.files['aadhar_card'][0];
            const result = await cloudinary.uploader.upload(aadharCard.path, {
                folder: "Security_Guard_AadharCard",
            });
            aadharCardUrl = result.secure_url;
            fs.unlink(aadharCard.path, (err) => {
                if (err) console.error("Error deleting aadhar card:", err);
            });
        }

        const response = new Guard({
            profile_photo: profilePictureUrl,
            fullName,
            phoneNomber,
            gender,
            shift,
            shiftDate,
            shiftTime,
            aadhar_card: aadharCardUrl
        });
        await response.save();
        res.status(200).json({ message: 'Guard created successfully' });
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
        const { profile_photo, fullName, phoneNomber, gender, shift, shiftDate, shiftTime, aadhar_card } = req.body;
        const updatedGuard = await Guard.findByIdAndUpdate(
            id,
            { profile_photo, fullName, phoneNomber, gender, shift, shiftDate, shiftTime, aadhar_card },
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
