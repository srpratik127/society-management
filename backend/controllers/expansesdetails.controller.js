const ExpenseDetails = require('../models/expensesdetails.model');
const fs =require('fs');
const cloudinary = require('../utils/cloudinary');

const createExpense = async (req, res) => {
    try {
      const { title, dueDate, description, amount, societyId, userId } = req.body;
      if (!title || !dueDate || !amount) {
        return res.status(400).json({
          success: false,
          message: 'Title, due date, and amount are required.',
        });
      }
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Bill file is required.',
        });
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'expenses_bills',
      });
      const billUrl = result.secure_url;
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error("Error deleting the file:", err);
        }
      });
      const newExpense = new ExpenseDetails({
        title,
        dueDate,
        description,
        amount,
        bill: billUrl,  
        societyId,
        userId,
      });
      const savedExpense = await newExpense.save();
      res.status(201).json({
        success: true,
        data: savedExpense,
      });
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
    const { title, dueDate, description, amount } = req.body;
    let updatedBillUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'expenses_bills', 
      });
      updatedBillUrl = result.secure_url;
      const existingExpense = await ExpenseDetails.findById(req.params.id);
      if (existingExpense && existingExpense.bill) {
        const publicId = existingExpense.bill.split('/').slice(-2).join('/').split('.')[0]; 
        const destroyResponse = await cloudinary.uploader.destroy(publicId); 
        if (destroyResponse.result !== 'ok') {
          console.error('Error deleting old bill:', destroyResponse);
        }
      }
      fs.unlinkSync(req.file.path);
    }
    const updatedExpense = await ExpenseDetails.findByIdAndUpdate(
      req.params.id,
      { 
        title, 
        dueDate, 
        description, 
        amount, 
        bill: updatedBillUrl || undefined, 
      },
      { new: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json(updatedExpense);
  } catch (error) {
    console.error('Error in updating expense:', error);
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