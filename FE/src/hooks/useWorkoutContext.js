import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw Error("error");
  }

  return context;
};
