const express = require('express');
const router = express.Router();
const controller = require('../controllers/income.controller.js');

router.post('/', controller.createIncome);
router.get('/',controller.getIncome)
router.put('/:id', controller.updateIncome);
router.delete('/:id', controller.deleteIncome);  
router.put('/add-member/:id', controller.addMemberToIncome);

module.exports = router;
