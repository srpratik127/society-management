const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaint.controller');

router.post('/', complaintController.createComplaint); 
router.get('/', complaintController.getComplaints);
router.get('/:userId', complaintController.getComplaintsByUserId); 
router.put('/:id', complaintController.updateComplaint);
router.delete('/:id', complaintController.deleteComplaint); 

module.exports = router;
