const mongoose = require("mongoose");
const Polls = require("../models/polls.model");
const Resident = require("../models/resident.model");
const Admin = require("../models/admin.model");

const createPoll = async (req, res) => {
  try {
    const { userId, question, options, multipleChoice, endDate } = req.body;
    if (!options || options.length < 2) {
      return res
        .status(400)
        .json({ message: "Poll needs at least two options." });
    }
    let creator = await Resident.findById(userId);
    let model = "Resident";
    if (!creator) {
      creator = await Admin.findById(userId);
      model = "Admin";
    }
    if (!creator) {
      return res.status(404).json({ message: "Resident or Admin not found" });
    }
    const poll = new Polls({
      question,
      options: options.map((option) => ({ optionText: option })),
      multipleChoice,
      createdBy: {
        _id: creator._id,
        model,
      },
      endDate,
    });
    const savedPoll = await poll.save();
    let populatedPoll;
    if (model === "Resident") {
      populatedPoll = await Polls.findById(savedPoll._id).populate({
        path: "createdBy._id",
        select: "fullName",
        model: "Resident",
      });
    } else if (model === "Admin") {
      populatedPoll = await Polls.findById(savedPoll._id).populate({
        path: "createdBy._id",
        select: "firstname lastname", 
        model: "Admin",
      });
    }
    res.status(201).json({
      message: "Poll created successfully and sent to all residents and users.",
      poll: populatedPoll,
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
      voter = await Admin.findById(residentId);
      if (!voter) {
        return res.status(404).json({ message: "Admin/Resident not found" });
      }
    }
    let previousVotes = 0;
    poll.options.forEach((option) => {
      const voterIndex = option.voters.findIndex(
        (voter) => voter._id.toString() === residentId
      );
      if (voterIndex !== -1) {
        option.votes -= 1;
        option.voters.splice(voterIndex, 1); 
        previousVotes += 1; 
      }
    });
    selectedOptions.forEach((optionId) => {
      const option = poll.options.id(optionId);
      if (option) {
        option.votes += 1;
        option.voters.push({
          _id: residentId,
          model: voter.constructor.modelName,
        });
      }
    });
    poll.totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);
    await poll.save();
    res.status(200).json({ message: "Vote updated successfully", poll });
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
    const polls = await Polls.find();
    const populatedPolls = await Promise.all(
      polls.map(async (poll) => {
        if (poll.createdBy.model === "Resident") {
          return await Polls.findById(poll._id)
            .populate({
              path: "createdBy._id",
              select: "fullName email",
              model: "Resident",
            })
            .populate("options.voters", "fullName email");
        } else if (poll.createdBy.model === "Admin") {
          return await Polls.findById(poll._id)
            .populate({
              path: "createdBy._id",
              select: "firstname lastname email",
              model: "Admin",
            })
            .populate({
              path: "options.voters",
              select: "firstname lastname email",
              model: "Admin", 
            });
        }
        return poll;
      })
    );

    res.status(200).json(populatedPolls);
  } catch (error) {
    console.error("Error fetching polls:", error);
    res.status(500).json({
      message: "Error fetching polls",
      error: error.message,
    });
  }
};

module.exports = {
  createPoll,
  votePoll,
  getPollResultsById,
  getAllPollResults,
};
