const mongoose = require('mongoose');
const Polls = require('../models/polls.model');
const Resident = require('../models/resident.model');

const createPoll = async (req, res) => {
    try {
        const { userId, question, options, multipleChoice, endDate } = req.body;
        if (!options || options.length < 2) {
            return res.status(400).json({ message: "Poll needs at least two options." });
        }
        const resident = await Resident.findById(userId);
        console.log("userId from request:", userId);
        if (!resident) {
            console.log("Resident not found with ID:", userId);
            return res.status(404).json({ message: "Resident not found" });
        }
        const poll = new Poll({
            question,
            options: options.map(option => ({ optionText: option })), 
            multipleChoice,
            createdBy: resident._id, 
            endDate
        });
        const savedPoll = await poll.save();
        const allResidents = await Resident.find(); 
        console.log("All residents count:", allResidents.length);
        allResidents.forEach((resident) => {
            console.log(`Sending poll to resident: ${resident.fullName} (${resident.email})`);
        });
        res.status(201).json({
            message: "Poll created successfully and sent to all residents.",
            poll: savedPoll
        });
    } catch (error) {
        console.error("Error creating poll:", error);
        res.status(500).json({ message: "Error creating poll" });
    }
};

const votePoll = async (req, res) => {
    try {
        const { pollId, selectedOptions } = req.body; 
        if (!mongoose.Types.ObjectId.isValid(pollId)) {
            return res.status(400).json({ message: "Invalid Poll ID" });
        }
        const poll = await Poll.findById(pollId);
        if (!poll) {
            return res.status(404).json({ message: "Poll not found" });
        }
        if (!poll.multipleChoice && selectedOptions.length > 1) {
            return res.status(400).json({ message: "Only one option allowed for this poll." });
        }
        const residentId = req.body.residentId || "hardcoded_resident_id"; 
        const resident = await Resident.findById(residentId).populate('members'); 
        if (!resident) {
            return res.status(404).json({ message: "Resident not found" });
        }
        const allMembers = [resident._id, ...resident.members.map(member => member._id)];
        selectedOptions.forEach(optionId => {
            const option = poll.options.id(optionId);
            if (option) {
                allMembers.forEach(memberId => {
                    if (!option.voters.includes(memberId)) { 
                        option.votes += 1;
                        option.voters.push(memberId);
                    }
                });
            }
        });
        poll.totalVotes += selectedOptions.length * allMembers.length;
        await poll.save();
        res.status(200).json({ message: "Vote recorded", poll });
    } catch (error) {
        console.error("Error voting on poll:", error);
        res.status(500).json({ message: "Error voting on poll" });
    }
};

const getPollResultsById = async (req, res) => {
    try {
        const userId = req.body.userId || (req.user ? req.user._id : null);
        if (!userId) {
            return res.status(400).json({ message: "User ID is required to fetch polls." });
        }
        const poll = await Poll.find({ createdBy: userId })
            .populate('createdBy', 'fullName email')
            .populate('options.voters', 'fullName email');
        if (!poll || poll.length === 0) {
            return res.status(404).json({ message: "No polls found for this user." });
        }
        res.status(200).json(poll);
    } catch (error) {
        console.error("Error fetching polls for this user:", error);
        res.status(500).json({ message: "Error fetching poll", error: error.message });
    }
};

const getAllPollResults = async (req, res) => {
    try {
        const polls = await Poll.find()
            .populate('createdBy', 'fullName email')  
            .populate('options.voters', 'fullName email');  
        if (!polls || polls.length === 0) {
            return res.status(404).json({ message: "No polls found." });
        }
        res.status(200).json(polls);
    } catch (error) {
        console.error("Error fetching polls:", error);
        res.status(500).json({ message: "Error fetching poll", error: error.message });
    }
};


module.exports={
    createPoll,
    votePoll,
    getPollResultsById,
    getAllPollResults,
}