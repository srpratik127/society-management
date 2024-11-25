const mongoose = require("mongoose");

const guardSchema = new mongoose.Schema({
  profile_picture: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKc08Wq1A-TIERnJUrHsmF9Asnmz5f_EnD5Mr8kQsJNZCdHjg_medKyoo&s",
  },
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  shift: {
    type: String,
    enum: ["Day", "Night"],
  },
  shiftDate: {
    type: Date,
  },
  shiftTime: {
    type: String,
  },
  aadhar_card: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_role: {
    type: String,
    default: "security",
  },
  select_society: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "societies",
    required: true,
  },
});

const Guard = mongoose.model("Guard", guardSchema);

module.exports = Guard;
