const Protocol = require("../models/Protocol.model.js");

const createProtocol = async (req, res) => {
  try {
    const { title, description } = req.body;
    const response = new Protocol({
      title,
      description,
    });
    await response.save();
    res.status(200).json({ message: "Protocol created successfully", data: response});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating Protocol", error: error.message });
  }
};

const getProtocol = async (req, res) => {
  try {
    const data = await Protocol.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Get Protocol controller error" });
  }
};

const updateProtocol = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, description, time } = req.body;
    const updatedProtocol = await Protocol.findByIdAndUpdate(
      id,
      { title, date, description, time },
      { new: true, runValidators: true }
    );
    if (!updatedProtocol) {
      return res.status(404).json({ message: "Protocol not found" });
    }
    res
      .status(200)
      .json({
        message: "Protocol updated successfully",
        data: updatedProtocol,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating Protocol", error: error.message });
  }
};

const deleteProtocol = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProtocol = await Protocol.findByIdAndDelete(id);
    if (!deletedProtocol) {
      return res.status(404).json({ message: "Protocol not found" });
    }
    res.status(200).json({ message: "Protocol deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Protocol", error: error.message });
  }
};

module.exports = {
  createProtocol,
  getProtocol,
  updateProtocol,
  deleteProtocol,
};
