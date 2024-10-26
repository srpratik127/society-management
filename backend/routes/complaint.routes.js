const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaint.controller');

router.post('/complaints', complaintController.createComplaint); 
router.get('/complaints', complaintController.getComplaints);
router.get('/complaints/:id', complaintController.getComplaintById); 
router.put('/complaints/:id', complaintController.updateComplaint);
router.delete('/complaints/:id', complaintController.deleteComplaint); 

module.exports = router;
