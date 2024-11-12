const Polls = require("../models/polls.model.js");

const createPolls = async (req, res) => {
    try {
        const { polls, question, option_1, option_2 } = req.body;
        const response = new Polls({
            polls,
            question,
            option_1,
            option_2
        });
        await response.save();
        res.status(200).json({ message: 'Polls created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Polls', error: error.message });
    }
};

const getPolls = async (req, res) => {
    try {
        const data = await Polls.find();
        res.status(200).json(data)        
    } catch (error) {
        res.status(500).json({ message: 'Get Polls controller error' })
    }
};

const updatePolls = async (req, res) => {
    try {
        const { id } = req.params;
        const { polls, question, option_1, option_2 } = req.body;
        const updatedPolls = await Polls.findByIdAndUpdate(
            id,
            { polls, question, option_1, option_2 },
            { new: true, runValidators: true }
        );
        if (!updatedPolls) {
            return res.status(404).json({ message: "Polls not found" });
        }
        res.status(200).json({ message: "Polls updated successfully", data: updatedPolls });
    } catch (error) {
        res.status(500).json({ message: "Error updating Polls", error: error.message });
    }
};

const deletePolls = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPolls = await Polls.findByIdAndDelete(id);
        if (!deletedPolls) {
            return res.status(404).json({ message: "Polls not found" });
        }
        res.status(200).json({ message: "Polls deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Polls", error: error.message });
    }
};

module.exports = {
    createPolls,
    getPolls,
    updatePolls,
    deletePolls
};
