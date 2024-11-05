const express = require('express');
const { createOwner, getOwners, getOwnerById, vacateUnit, vacateflat } = require('../controllers/resident.controller');
const router = express.Router();

router.post('/', createOwner);
router.get('/', getOwners);
router.get('/:id', getOwnerById);
router.put('/:id', vacateflat);

module.exports = router;
