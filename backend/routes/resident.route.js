const express = require('express');
const { createOwner, getOwners, getOwnerById, vacateUnit, vacateflat, updateOwner, getOccupiedOwners } = require('../controllers/resident.controller');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
  },
});
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.fields([
  { name: 'profile_picture', maxCount: 1 },
  { name: 'aadharCardFront', maxCount: 1 },
  { name: 'aadharCardBack', maxCount: 1 },
  { name: 'addressProof', maxCount: 1 },
  { name: 'rentAgreement', maxCount: 1 },
]), createOwner);
router.get('/occupied', getOccupiedOwners);
router.get('/', getOwners);
router.get('/:id', getOwnerById);
router.put('/:id', upload.fields([
    { name: 'profile_picture', maxCount: 1 },
    { name: 'aadharCardFront', maxCount: 1 },
    { name: 'aadharCardBack', maxCount: 1 },
    { name: 'addressProof', maxCount: 1 },
    { name: 'rentAgreement', maxCount: 1 },
  ]),  updateOwner);
router.put('/vacate-flat/:id', vacateflat);

module.exports = router;


