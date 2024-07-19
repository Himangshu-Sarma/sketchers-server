const User = require("../models/User.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
  const JWT_S = 'HIMU$DA';

  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the details" });
    }

    email = email?.toString().trim();
    password = password?.toString().trim();

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User with this email does not exist",
      });
    }

    const passComp = bcrypt.compare(password, user.password);

    if (!passComp) {
      return res.status(400).json({
        sucess: false,
        message: "Password is wrong",
      });
    }

    const authToken = jwt.sign(user.toJSON(), JWT_S, {expiresIn: 604800});

    return res.status(200).json({
      success: true,
      authToken,
      message: "Login successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = login;