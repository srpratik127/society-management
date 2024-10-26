const Complaint =require('../models/complaint.models.js'),

 createComplaint = async (req, res) => {
  try {
    const newComplaint = await Complaint.create(req.body);
    res.status(201).json({
      success: true,
      data: newComplaint
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json({
      success: true,
      data: complaints
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id); 
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }
    res.status(200).json({
      success: true,
      data: complaint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, {
      new: true,  
      runValidators: true 
    });
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }
    res.status(200).json({
      success: true,
      data: complaint
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Complaint deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports ={
    createComplaint,
    getComplaints,
    getComplaintById,
    updateComplaint,
    deleteComplaint
}
