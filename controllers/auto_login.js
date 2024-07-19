const jwt = require("jsonwebtoken");

const auto_login = async (req, res) => {
  const JWT_S = 'HIMU$DA';

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_S);

    const { name, email } = { name: decoded.name, email: decoded.email };

    res.status(200).json({
      success: true,
      name: name,
      email: email,
    });
  } catch (error) {
    res.status(401).json({
      sucess: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = auto_login;
