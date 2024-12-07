const Announcement = require("../models/announcement.model");

const createAnnouncement = async (req, res) => {
    try {
        const {type, title, description, date, time } = req.body;
        const response = new Announcement({
            type,
            title,
            description,
            date,
            time
        });
        await response.save();
        res.status(200).json({ message: 'Announcement created successfully', data:response });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Announcement', error: error.message });
    }
};

const getAnnouncement = async (req, res) => {
    try {
        const data = await Announcement.find();
        res.status(200).json(data)        
    } catch (error) {
        res.status(500).json({ message: 'Get Announcement controller error' })
    }
};

const updateAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const {type, title, description, date, time } = req.body;
        const updatedAnnouncement = await Announcement.findByIdAndUpdate(
            id,
            {type, title, description, date, time },
            { new: true, runValidators: true }
        );
        if (!updatedAnnouncement) {
            return res.status(404).json({ message: "Announcement not found" });
        }
        res.status(200).json({ message: "Announcement updated successfully", data: updatedAnnouncement });
    } catch (error) {
        res.status(500).json({ message: "Error updating announcement", error: error.message });
    }
};

const deleteAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAnnouncement = await Announcement.findByIdAndDelete(id);
        if (!deletedAnnouncement) {
            return res.status(404).json({ message: "Announcement not found" });
        }
        res.status(200).json({ message: "Announcement deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting announcement", error: error.message });
    }
};

module.exports = {
    createAnnouncement,
    getAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
};
