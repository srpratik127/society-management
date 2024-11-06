const Income = require("../models/income.model");

const createIncome = async (req, res) => {
    try {
        const { title, date, dueDate, description,amount } = req.body;
        const response = new Income({
            title,
            date,
            dueDate,
            description,
            amount
        });
        await response.save();
        res.status(200).json({ message: 'Income created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Income', error: error.message });
    }
};

const getIncome = async (req, res) => {
    try {
        const data = await Income.find();
        res.status(200).json(data)        
    } catch (error) {
        res.status(500).json({ message: 'Get Income controller error' })
    }
};

const updateIncome = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date, dueDate, description ,amount} = req.body;
        const updatedIncome = await Income.findByIdAndUpdate(
            id,
            { title, date, dueDate, description ,amount },
            { new: true, runValidators: true }
        );
        if (!updatedIncome) {
            return res.status(404).json({ message: "Income not found" });
        }
        res.status(200).json({ message: "Income updated successfully", data: updatedIncome });
    } catch (error) {
        res.status(500).json({ message: "Error updating Income", error: error.message });
    }
};

const deleteIncome = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedIncome = await Income.findByIdAndDelete(id);
        if (!deletedIncome) {
            return res.status(404).json({ message: "Income not found" });
        }
        res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Income", error: error.message });
    }
};

module.exports = {
    createIncome,
    getIncome,
    updateIncome,
    deleteIncome
};
