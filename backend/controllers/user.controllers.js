
const User = require('../models/user.models'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 


const Register = async (req, res) => {
  try {
      const { firstname, lastname, email, password, confirmpassword, phone, country, state, city, select_cociety, society } = req.body;

      console.log(req.body); 

      if (password !== confirmpassword) {
          return res.status(400).json({ msg: 'Passwords do not match' });
      }

      let user = await User.findOne({ email });
      if (user) {
          return res.status(400).json({ msg: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(password, salt);

      const newuser = new User({
          firstname,
          lastname,
          email,
          phone,
          country,
          state,
          city,
          select_cociety, 
          society,
          password: hashpassword,
          confirmpassword: hashpassword 
      });

      console.log("New User Object:", newuser); 
      await newuser.save();

      const payload = {
          user: {
              id: newuser.id,
          }
      };

   
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({
          msg: "User registered successfully",
          token,
      });

  } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Server error" });
  }
};


module.exports = { Register }; 
