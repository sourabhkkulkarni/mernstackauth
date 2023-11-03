const User = require("../models/userModel");

// JWT
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user?._id);

    // res.status(200).json({ email, user }); without jwt token
    res.status(200).json({ email, token }); //with  token

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  // res.json({ message: "Login user" });
};

// signup user
const signUpUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signUp(email, password);

    // create a token
    const token = createToken(user?._id);

    // res.status(200).json({ email, user }); without jwt token
    res.status(200).json({ email, token }); //with  token

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  // res.json({ message: "signup user" });
};

module.exports = {
  loginUser,
  signUpUser,
};
