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
      const data = await Income.find().populate("members.user", "fullName wing unit residenceStatus phone");
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Get Income controller error', error: error.message });
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

const addMemberToIncome = async (req, res) => {
    try {
      const { user, paymentDate, paymentMethod } = req.body;
      const income = await Income.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            members: {
              user: user,  
              paymentDate: paymentDate,
              paymentMethod: paymentMethod,
            },
          },
        },
        { new: true } 
      ).populate("members.user", "fullName wing unit residenceStatus phone");
      if (!income) {
        return res.status(404).json({
          success: false,
          message: "Income event not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Member added successfully to the income event",
        data: income,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error while adding member",
        error: error.message,
      });
    }
  };

module.exports = {
    createIncome,
    getIncome,
    updateIncome,
    deleteIncome,
    addMemberToIncome
};
