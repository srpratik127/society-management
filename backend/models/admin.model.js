const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  select_society: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "societies",
    required: true,
  },
  user_role: {
    type: String,
    default: "admin",
  },
  profile_picture: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKc08Wq1A-TIERnJUrHsmF9Asnmz5f_EnD5Mr8kQsJNZCdHjg_medKyoo&s",
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
