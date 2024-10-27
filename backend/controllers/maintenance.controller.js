const Maintenance = require('../models/maintenance.model')

const addMaintenance = (req, res) => {
    try {
        const { anount, penaltyAmount, dueDate, penaltyDay, status } = req.body;
    } catch (error) {}
}

const getStatus = async (req, res) => {
    try {
        const status = req.params.status;
        if (status == 'pending' || status == 'done') {
            const response = await Maintenance.find({ status : status });
            res.status(200).json(response)
        } else {
            res.status(404).json({ message: 'Get status error' })
            console.log("Get status error");
        }
    } catch (error) {
        console.log("Get status controller error");
        res.status(404).json({ message: 'Get status controller error' })
    }
}


const getAllStatus = async (req, res) => {
    try {
        const allMaintenance = await Maintenance.find();
        res.status(200).json(allMaintenance)
    } catch (error) {
        console.log("Get allMaintenance Errer", error);
        res.status(404).json({ message: 'Get allMaintenance controller error' })
    }
}

module.exports = {
    addMaintenance,
    getStatus,
    getAllStatus
}