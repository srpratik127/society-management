const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('../controllers/guard.controller');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ dest: 'uploads/' }).fields([
    { name: 'profile_photo', maxCount: 1 },
    { name: 'aadhar_card', maxCount: 1 }
]);

router.post('/', upload, controller.createGuard);
router.get('/', controller.getGuard)
router.put('/:id', controller.updateGuard);
router.delete('/:id', controller.deleteGuard);

module.exports = router;
