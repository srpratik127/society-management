const express = require('express');
const { createOwner, getOwners, getOwnerById } = require('../controllers/resident.controller');
const router = express.Router();

router.post('/', createOwner);
router.get('/', getOwners);
router.get('/:id', getOwnerById);

module.exports = router;
