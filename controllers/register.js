const express = require("express");
const User = require("../models/User.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const signup = async (req, res) => {
  const JWT_S = 'HIMU$DA';

  try {
    // const {currentTime} = req.body;
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Please fill all the required details" });
    }

    
    name = name?.toString().trim();
    email = email?.toString().trim();
    password = password?.toString().trim();
    
    console.log(email, name, password);

    if (password.length < 5) {
      return res
        .status(400)
        .json({ error: "Password length should be atleast 5" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        error: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    const user = new User({
      name: name,
      email: email,
      password: secPass,
    });

    await user.save();

    const authToken = jwt.sign(user.toJSON(), JWT_S, {expiresIn: 604800});

    return res.status(200).json({
      success: true,
      authToken: authToken,
      message: "Successfully signed up",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = signup;
