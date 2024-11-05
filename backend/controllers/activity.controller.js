const Activity = require("../models/activity.model");

const createActivity = async (req, res) => {
    try {
        const { title, date, startTime, endTime } = req.body;
        const activity = new Activity({
            title,
            date,
            startTime,
            endTime
        });
        await activity.save();
        res.status(201).json({ message: "Activity created successfully", data: activity });
    } catch (error) {
        res.status(500).json({ message: "Error creating activity", error: error.message });
    }
};

const getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find();
        res.status(200).json({ data: activities });
    } catch (error) {
        res.status(500).json({ message: "Error fetching activities", error: error.message });
    }
};


const updateActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date, startTime, endTime } = req.body;
        const updatedActivity = await Activity.findByIdAndUpdate(
            id,
            { title, date, startTime, endTime },
            { new: true, runValidators: true }
        );
        if (!updatedActivity) {
            return res.status(404).json({ message: "Activity not found" });
        }
        res.status(200).json({ message: "Activity updated successfully", data: updatedActivity });
    } catch (error) {
        res.status(500).json({ message: "Error updating activity", error: error.message });
    }
};

const deleteActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedActivity = await Activity.findByIdAndDelete(id);
        if (!deletedActivity) {
            return res.status(404).json({ message: "Activity not found" });
        }
        res.status(200).json({ message: "Activity deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting activity", error: error.message });
    }
};

module.exports = {
    createActivity,
    getAllActivities,
    updateActivity,
    deleteActivity
};