const mongoose = require("mongoose");

const pollsSchema = new mongoose.Schema({
    polls: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    option_1: {
        type: String,
        required: true,
    },
    option_2: {
        type: String,
        required: true,
    }
});

const polls = mongoose.model("User-polls", pollsSchema);

module.exports = polls;
