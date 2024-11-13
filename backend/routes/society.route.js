const express = require('express');
const router = express.Router();
const societyController = require('../controllers/society.controller')

router.post('/', societyController.createSociety);
router.get('/', societyController.getAllSociety);
router.get('/:id', societyController.getSocietyById);

module.exports = router;
