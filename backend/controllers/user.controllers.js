const User = require('../models/user.models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Register = async (req, res) => {
  try {
    
    const { firstname, lastname, email, password, phone, country, state, city, select_society,} = req.body;

     if (!password) {
      return res.status(400).json({ msg: 'Passwords is mendatry' });
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
      password: hashpassword,
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


const Login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'email not exists' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'password do not match' });
      }
      const payload = { user: { id: user.id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ msg: 'Login successful', token });
    } catch (error) {
      console.error('Error during login:', error.message);
      res.status(500).json({ msg: 'Server error' });
    }
  };


  const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { firstname, lastname, email, phone, country, state, city, select_society } = req.body;
  
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { firstname, lastname, email, phone, country, state, city, select_society },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      res.status(200).json({ msg: 'User updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error updating user:', error.message);
      res.status(500).json({ msg: 'Server error' });
    }
  };
  

module.exports = {  
    Register,
    Login,
    updateUser
};
