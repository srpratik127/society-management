const express = require('express');
const router = express.Router();
const societyController = require('../controllers/society.controller')

router.post('/', societyController.createSociety);
router.get('/', societyController.getAllSociety);

module.exports = router;
