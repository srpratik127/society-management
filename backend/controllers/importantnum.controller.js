const ImportantNum = require('../models/importantnum.model');

addNumber = async (req, res) => {
  try {
    const newNumber = await ImportantNum.create(req.body);
    res.status(201).json({
      success: true,
      data: newNumber
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


updateNumber = async (req, res) => {
  try {
    const updatedNumber = await ImportantNum.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedNumber) {
      return res.status(404).json({
        success: false,
        message: 'Number not found'
      });
    }
    res.status(200).json({
      success: true,
      data: updatedNumber
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


deleteNumber = async (req, res) => {
  try {
    const deletedNumber = await ImportantNum.findByIdAndDelete(req.params.id);
    if (!deletedNumber) {
      return res.status(404).json({
        success: false,
        message: 'Number not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Number deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  addNumber,
  updateNumber,
  deleteNumber
}