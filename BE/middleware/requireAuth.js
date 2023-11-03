// JWT
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const requireAuth = async (req, res, next) => {
  // verfiy authentication
  const { authorization } = req.headers;

  // check if header is present ,which wont be present in case of GET call of "/api/workouts"
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  // get the token from 'authorization'

  const token = authorization.split(" ")[1];

  try {
    const _id = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;