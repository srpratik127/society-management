const express = require('express');
const router = express.Router();
const expenseDetailsController = require('../controllers/expansesdetails.controller');

router.post('/', expenseDetailsController.createExpense);
router.get('/', expenseDetailsController.getAllExpenses);
router.get('/:id', expenseDetailsController.getExpenseById);
router.put('/:id', expenseDetailsController.updateExpense);
router.delete('/:id', expenseDetailsController.deleteExpense);

module.exports = router;
