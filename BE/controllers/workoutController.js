const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// get all workouts
const getWorkouts = async (req, res) => {
  
  // get workouts based on logged in user
  const user_id = req.user._id;

  const workouts = await Workout.find({user_id}).sort({ createdAt: -1 });
  res.status(200).json(workouts);

  // get all users
  // const workouts = await Workout.find({}).sort({ createdAt: -1 });
  // res.status(200).json(workouts);
};

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  // check for valid id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No records found" });
  }
  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No records found" });
  }

  res.status(200).json(workout);
};

// create new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  // proper validations

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }

  if (emptyFields?.length > 0) {
    return res
      .status(400)
      .json({ errMsg: "please fill in all the fields", emptyFields });
  }
  // add doc to DB
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, reps, load,user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ errMsg: error.message });
  }
  //   res.json({ message: "POST a new workout" });
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  // check for valid id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No records found" });
  }

  const workout = await Workout.findByIdAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "No records found" });
  }

  res.status(200).json(workout);
};

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  // check for valid id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No records found" });
  }
  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!workout) {
    return res.status(404).json({ error: "No records found" });
  }
  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
