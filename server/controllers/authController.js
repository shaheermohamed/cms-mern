const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Registers a new user.
 */
const register = async (req, res) => {
  try {
    const {email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

/**
 * Handles user login by verifying credentials, generating a token upon successful login, and returning appropriate responses.
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid email or password", loggedIn: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id, user }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token, user, loggedIn: true });
  } catch (error) {
    res.status(500).json({ error: "Login failed", loggedIn: false });
  }
};

module.exports = { register, login };
