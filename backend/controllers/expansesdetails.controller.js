const ExpenseDetails = require('../models/expensesdetails.model');

const createExpense = async (req, res) => {
    try {
        const { title, dueDate, description, amount, bill, societyId, userId } = req.body;

        const newExpense = new ExpenseDetails({
            title,
            dueDate,
            description,
            amount,
            bill,
            societyId,
            userId,
        });

        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

 const getAllExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseDetails.find().populate('societyId userId');
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getExpenseById = async (req, res) => {
    try {
        const expense = await ExpenseDetails.findById(req.params.id).populate('societyId userId');
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateExpense = async (req, res) => {
    try {
        const { title, dueDate, description, amount, bill } = req.body;
        const updatedExpense = await ExpenseDetails.findByIdAndUpdate(
            req.params.id,
            { title, dueDate, description, amount, bill },
            { new: true }
        );
        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteExpense = async (req, res) => {
    try {
        const deletedExpense = await ExpenseDetails.findByIdAndDelete(req.params.id);
        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports={
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
}