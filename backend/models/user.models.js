const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
      type: String,
      required: true
  },
  lastname: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true
  },
  confirmpassword: {
      type: String,
      required: true
  },
  phone: {
      type: String,
      required: true
  },
  country: {
      type: String,
      required: true
  },
  state: {
      type: String,
      required: true
  },
  city: {
      type: String,
      required: true
  },
  select_cociety: {  
      type: String,
      required: true,
  },
  society: {
      type: String,
      required: true
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User; 
