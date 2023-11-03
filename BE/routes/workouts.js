const express = require("express");
const router = express.Router();
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

// get auth
const routerAuth = require("../middleware/requireAuth");

// require auth for all workout routes
router.use(routerAuth);

// GET all workouts
router.get("/", getWorkouts);

// GET single workout
router.get("/:id", getWorkout);

// POST  workouts
router.post("/", createWorkout);

// DELETE  a workout
router.delete("/:id", deleteWorkout);

// UPDATE a  workout
router.patch("/:id", updateWorkout);

module.exports = router;
