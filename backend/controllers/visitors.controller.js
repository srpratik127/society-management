const Visitors = require("../models/visitors.model.js");

const createVisitor = async (req, res) => {
    try {
        const { name, phoneNumber, date, time, wing, unit } = req.body;
        const response = new Visitors({
            name,
            phoneNumber,
            date,
            time,
            wing,
            unit
        });
        await response.save();
        res.status(200).json({ message: 'Visitor created successfully', data: response});
    } catch (error) {
        res.status(500).json({ message: 'Error creating Visitor', error: error.message });
    }
};

const getVisitor = async (req, res) => {
    try {
        const data = await Visitors.find();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: 'Get Visitor controller error' })
    }
};

const updateVisitor = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phoneNumber, date, time, wing, unit } = req.body;
        const updatedVisitor = await Visitors.findByIdAndUpdate(
            id,
            { name, phoneNumber, date, time, wing, unit },
            { new: true, runValidators: true }
        );
        if (!updatedVisitor) {
            return res.status(404).json({ message: "Visitor not found" });
        }
        res.status(200).json({ message: "Visitor updated successfully", data: updatedVisitor });
    } catch (error) {
        res.status(500).json({ message: "Error updating Visitor", error: error.message });
    }
};

const deleteVisitor = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVisitor = await Visitors.findByIdAndDelete(id);
        if (!deletedVisitor) {
            return res.status(404).json({ message: "Visitor not found" });
        }
        res.status(200).json({ message: "Visitor deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Visitor", error: error.message });
    }
};

module.exports = {
    createVisitor,
    getVisitor,
    updateVisitor,
    deleteVisitor
};
