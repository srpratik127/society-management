const express = require('express');
const router = express.Router();
const controller = require('../controllers/income.controller.js');

router.post('/', controller.createIncome);
router.get('/',controller.getIncome)
router.put('/:id', controller.updateIncome);
router.delete('/:id', controller.deleteIncome);
router.put('/notify/:id', controller.notifyToIncome);
router.get('/:userId', controller.getIncomeExcludingMembers);
router.post("/create-order", controller.createOrder);
router.post("/verify", controller.verifyPayment);
router.put("/add-member/:incomeId", controller.updateOrRejectPayment);
module.exports = router;
