import React, { useEffect, useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutsForm from "../components/WorkoutsForm";

const Home = () => {
  // const [workouts, setWorkouts] = useState(null);
  const { workouts, dispatch } = useWorkoutContext();

  const {user} = useAuthContext();

  useEffect(() => {
    // WITHOUT AUTHORIZATION

    // const fetchWorkouts = async () => {
    //   const response = await fetch("/api/workouts"); // Added proxy in package.json with localhost:4000
    //   const json = await response.json();

    //   if (response.ok) {
    //     // setWorkouts(json);
    //     dispatch({ type: "SET_WORKOUT", payload: json });
    //   }
    // };

    //WITH AUTHORIZATION

     const fetchWorkouts = async () => {
      const response = await fetch("https://workout-app-auth.onrender.com/api/workouts",{
        headers:{
          'Authorization':`Bearer ${user.token}`
        }
      }); // Added proxy in package.json with localhost:4000
      const json = await response.json();

      if (response.ok) {
        // setWorkouts(json);
        dispatch({ type: "SET_WORKOUT", payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }

    // fetchWorkouts(); without authentication
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            // <p key={workout?._id}>{workout?.title}</p>
            <WorkoutDetails key={workout?._id} workout={workout} />
          ))}
      </div>
      <WorkoutsForm />
    </div>
  );
};

export default Home;
