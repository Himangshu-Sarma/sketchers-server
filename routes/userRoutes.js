const express = require("express");

const router = express.Router();

const register = require("../controllers/register.js");
const login = require("../controllers/login.js");
const auto_login = require("../controllers/auto_login.js");

router.post('/login', login);

router.post('/register', register);

router.post('/auto_login', auto_login);

module.exports = router;
