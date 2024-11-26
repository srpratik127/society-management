const express = require('express');
const router = express.Router();
const facilitiesController = require('../controllers/facility.controller');

router.post('/', facilitiesController.createFacility);
router.get('/', facilitiesController.getFacilities);
router.get('/:id', facilitiesController.getFacilityById);
router.put('/:id', facilitiesController.updateFacility);

module.exports = router;
