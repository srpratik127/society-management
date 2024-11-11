const express = require('express');
const router = express.Router();
const expenseDetailsController = require('../controllers/expansesdetails.controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('bill'), expenseDetailsController.createExpense);
router.get('/', expenseDetailsController.getAllExpenses);
router.get('/:id', expenseDetailsController.getExpenseById);
router.put('/:id', upload.single('bill'), expenseDetailsController.updateExpense);
router.delete('/:id', expenseDetailsController.deleteExpense);

module.exports = router;
