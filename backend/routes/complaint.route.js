const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaint.controller');
const {roleCheck} = require("../middleware/jwt-middleware.js")

router.post('/', roleCheck(["admin","resident"]), complaintController.createComplaint); 
router.get('/', complaintController.getComplaints);
router.get('/:userId', complaintController.getComplaintsByUserId); 
router.put('/:id', roleCheck(["admin"]), complaintController.updateComplaint);
router.delete('/:id', roleCheck(["admin", "resident"]), complaintController.deleteComplaint); 

module.exports = router;
