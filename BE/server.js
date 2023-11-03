require("dotenv").config();
const express = require("express");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");

// setup express app
const app = express();

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// middleware to hand;e request

app.use(express.json());

// Routes for test
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to the app" });
// });

// Actual Routing
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB and Listning", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// listen for request
// app.listen(process.env.PORT, () => {
//   console.log("Listning 4000 !");
// });
