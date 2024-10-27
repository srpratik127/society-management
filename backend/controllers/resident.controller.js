const Owner = require('../models/resident.model');

const createOwner = async (req, res) => {
  try {
    const newOwner = await Owner.create(req.body);
    res.status(201).json({
      success: true,
      data: newOwner
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const getOwners = async (req, res) => {
  try {
    const owners = await Owner.find();
    res.status(200).json({
      success: true,
      data: owners
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getOwnerById = async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (!owner) {
      return res.status(404).json({
        success: false,
        message: 'Owner not found'
      });
    }
    res.status(200).json({
      success: true,
      data: owner
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createOwner,
  getOwners,
  getOwnerById,
};
