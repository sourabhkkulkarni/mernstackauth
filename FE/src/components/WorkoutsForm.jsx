import React from "react";
import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutsForm = () => {
  const { dispatch } = useWorkoutContext();
  const {user} = useAuthContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [errorData, setErrorData] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
 

  const submitWorkout = async (e) => {
    e.preventDefault();

    if(!user){
      
      setErrorData('You must be logged in');
      return
    }
    const workout = { title, load, reps };

    // WITHOUT AUTHORIZATION
    // const response = await fetch("/api/workouts", {
    //   method: "POST",
    //   body: JSON.stringify(workout),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // WITH AUTHORIZATION
    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        'Authorization':`Bearer ${user.token}`
      },
    });

    const json = await response.json();

    if (!response.ok) {
      
      setErrorData(json.errMsg); // errMsg comes from backend "createWorkout" catch condition
      setEmptyFields(json.emptyFields)
    }

    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setErrorData(null);
      setEmptyFields([])
      console.log("New Record Added", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={submitWorkout}>
      <h3>Add a new workout</h3>

      <label>Excersize Title : </label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields?.includes('title') ? 'error':''}
      />

      <label>Load (Kg) : </label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields?.includes('load') ? 'error':''}
      />

      <label>Reps : </label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields?.includes('reps') ? 'error':''}
      />

      <button>Add workout</button>
      {errorData && <div className="error">{errorData}</div>}
    </form>
  );
};

export default WorkoutsForm;
