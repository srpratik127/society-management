const User = require('../models/user.models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Register = async (req, res) => {
  try {
    
    const { firstname, lastname, email, password, confirmpassword, phone, country, state, city, select_society, society } = req.body;

     if (!password) {
      return res.status(400).json({ msg: 'Passwords is mendetory' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstname,
      lastname,
      email,
      phone,
      country,
      state,
      city,
      select_society,  
      society,
      password: hashpassword 
    });

    await newUser.save();

    const payload = { user: { id: newUser.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ msg: 'User registered successfully', token });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { Register };