const Notification = require('../models/notification.model');

const getNotifications = async (req, res) => {
    try {
        const userId = req.params.userId;
        const notifications = await Notification.find({
            users: { $elemMatch: { _id: userId } },
        });

        const filteredNotifications = notifications.map((notification) => ({
            ...notification._doc,
            users: notification.users.filter((user) => user._id.toString() === userId),
        }));

        res.status(200).json(filteredNotifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ message: "Error fetching notifications", error: error.message });
    }
};

const clearAllNotifications = async (req, res) => {
    try {
        const { userId } = req.params;
        await Notification.updateMany(
            { "users._id": userId },
            { $pull: { users: { _id: userId } } }
        );

        res.status(200).json({ message: "All notifications cleared." });
    } catch (error) {
        console.error("Error clearing notifications:", error);
        res.status(500).json({ message: "Failed to clear notifications.", error: error.message });
    }
};

const clearSingleNotification = async (req, res) => {
    try {
        const { userId, notificationId } = req.params;
        
        await Notification.updateOne(
            { _id: notificationId, "users._id": userId },
            { $pull: { users: { _id: userId } } }
        );

        res.status(200).json({ message: "Notification cleared successfully." });
    } catch (error) {
        console.error("Error clearing single notification:", error);
        res.status(500).json({ message: "Failed to clear the notification.", error: error.message });
    }
};

module.exports={
    getNotifications,
    clearAllNotifications,
    clearSingleNotification
}


