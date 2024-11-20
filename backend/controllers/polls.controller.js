const mongoose = require("mongoose");
const Polls = require("../models/polls.model");
const Resident = require("../models/resident.model");
const User = require("../models/user.model");

const createPoll = async (req, res) => {
  try {
    const { userId, question, options, multipleChoice, endDate } = req.body;
    if (!options || options.length < 2) {
      return res
        .status(400)
        .json({ message: "Poll needs at least two options." });
    }
    const resident = await Resident.findById(userId);
    if (!resident) {
      console.log("Resident not found with ID:", userId);
      return res.status(404).json({ message: "Resident not found" });
    }
    const poll = new Polls({
      question,
      options: options.map((option) => ({ optionText: option })),
      multipleChoice,
      createdBy: [{ _id: resident._id, model: "Resident" }],
      endDate,
    });
    const savedPoll = await poll.save();
    const allResidents = await Resident.find();
    const allUsers = await User.find();
    console.log("All residents count:", allResidents.length);
    console.log("All users count:", allUsers.length);
    allResidents.forEach((resident) => {
      console.log(`Sending poll to resident: ${resident.fullName}`);
    });
    allUsers.forEach((user) => {
      console.log(`Sending poll to user: ${user.fullName}`);
    });
    res.status(201).json({
      message: "Poll created successfully and sent to all residents and users.",
      poll: savedPoll,
    });
  } catch (error) {
    console.error("Error creating poll:", error);
    res.status(500).json({ message: "Error creating poll" });
  }
};

const votePoll = async (req, res) => {
  try {
    const { pollId, selectedOptions, residentId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(pollId)) {
      return res.status(400).json({ message: "Invalid Poll ID" });
    }
    const poll = await Polls.findById(pollId);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }
    if (!poll.multipleChoice && selectedOptions.length > 1) {
      return res
        .status(400)
        .json({ message: "Only one option allowed for this poll." });
    }
    let voter = await Resident.findById(residentId);
    if (!voter) {
      voter = await User.findById(residentId);
      if (!voter) {
        return res.status(404).json({ message: "User/Resident not found" });
      }
    }
    selectedOptions.forEach((optionId) => {
      const option = poll.options.id(optionId);
      if (option) {
        if (
          !option.voters.some((voter) => voter._id.toString() === residentId)
        ) {
          option.votes += 1;
          option.voters.push({
            _id: residentId,
            model: voter.constructor.modelName,
          });
        }
      }
    });
    poll.totalVotes += selectedOptions.length;
    await poll.save();
    res.status(200).json({ message: "Vote recorded successfully", poll });
  } catch (error) {
    console.error("Error voting on poll:", error);
    res.status(500).json({ message: "Error voting on poll" });
  }
};

const getPollResultsById = async (req, res) => {
  try {
    const pollId = req.params.pollId;
    if (!pollId) {
      return res
        .status(400)
        .json({ message: "Poll ID is required to fetch poll results." });
    }
    const poll = await Polls.findById(pollId)
      .populate("createdBy", "fullName email")
      .populate("options.voters", "fullName email");
    if (!poll) {
      return res
        .status(404)
        .json({ message: "No poll found with the given ID." });
    }
    res.status(200).json(poll);
  } catch (error) {
    console.error("Error fetching poll by ID:", error);
    res
      .status(500)
      .json({ message: "Error fetching poll", error: error.message });
  }
};

const getAllPollResults = async (req, res) => {
  try {
    const polls = await Polls.find()
      .populate("createdBy", "fullName email")
      .populate("options.voters", "fullName email");
    if (!polls || polls.length === 0) {
      return res.status(404).json({ message: "No polls found." });
    }
    res.status(200).json(polls);
  } catch (error) {
    console.error("Error fetching polls:", error);
    res
      .status(500)
      .json({ message: "Error fetching polls", error: error.message });
  }
};

module.exports = {
  createPoll,
  votePoll,
  getPollResultsById,
  getAllPollResults,
};
