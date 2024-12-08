const Announcement = require("../models/announcement.model");
const Guard = require("../models/guard.model");
const Notification = require("../models/notification.model");
const Resident = require("../models/resident.model");

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

        const users = [
            ...(await Resident.find().select("_id")).map(({ _id }) => ({
              _id,
              model: "Resident",
            })),
            ...(await Guard.find().select("_id")).map(({ _id }) => ({
              _id,
              model: "Guard",
            })),
          ];
      
          const newNotification = await new Notification({
            title: "New Announcement",
            name : title,
            message: `A new Announcement "${title}" has been created.`,
            otherContent: {announcementId: response._id},
            users,
          }).save();


        await response.save();
        res.status(200).json({ message: 'Announcement created successfully', data:response, notification: newNotification });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Announcement', error: error.message });
    }
};

const getAnnouncement = async (req, res) => {
    try {
        const data = await Announcement.find().populate({
            path: 'members.user',
            select: 'profile_picture fullName'
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Get Announcement controller error' });
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

const addAnnouncementMember = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const updatedAnnouncement = await Announcement.findByIdAndUpdate(
            id,
            { $addToSet: { members: { user: userId } } },
            { new: true, runValidators: true }
        );

        if (!updatedAnnouncement) {
            return res.status(404).json({ message: "Announcement not found" });
        }

        res.status(200).json({ 
            message: "Member added successfully", 
            data: updatedAnnouncement 
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Error adding member to announcement", 
            error: error.message 
        });
    }
};

module.exports = {
    createAnnouncement,
    getAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    addAnnouncementMember
};
