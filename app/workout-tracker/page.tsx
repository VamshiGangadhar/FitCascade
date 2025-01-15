"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { API_END_POINT } from "../constants/constants";
import Link from "next/link";
import { ChevronRight, Plus, Trash } from "lucide-react";

interface Set {
  weight: number;
  reps: number;
}

interface Exercise {
  name: string;
  sets: Set[];
}

interface Workout {
  workoutName: string;
  exercises: Exercise[];
  totalVolume: number;
}

const muscleGroups = [
  "Chest",
  "Back",
  "Legs",
  "Shoulders",
  "Arms",
  "Core",
  "Cardio",
];

const exercisesByMuscleGroup: { [key: string]: string[] } = {
  Chest: ["Bench Press", "Incline Press", "Chest Flyes", "Push-Ups"],
  Back: ["Pull-Ups", "Rows", "Lat Pulldowns", "Deadlifts"],
  Legs: ["Squats", "Leg Press", "Lunges", "Leg Curls"],
  Shoulders: ["Overhead Press", "Lateral Raises", "Front Raises", "Shrugs"],
  Arms: ["Bicep Curls", "Tricep Extensions", "Hammer Curls", "Skull Crushers"],
  Core: ["Crunches", "Planks", "Russian Twists", "Leg Raises"],
  Cardio: [
    "Running",
    "Cycling",
    "Swimming",
    "Jump Rope",
    "Rowing",
    "Stair Climber",
    "Elliptical",
    "Walking",
  ],
};

export default function WorkoutTrackerPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [workoutName, setWorkoutName] = useState("Workout");
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("");
  const [selectedExercise, setSelectedExercise] = useState("");
  const [currentWorkout, setCurrentWorkout] = useState<Exercise[]>([]);
  const userId = localStorage.getItem("user_id");
  const { toast } = useToast();

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get(
        `${API_END_POINT}/api/workout-tracker/${userId}/day-summary`
      );
      setWorkouts(response.data.workouts || []);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  const addExercise = () => {
    if (selectedExercise) {
      setCurrentWorkout([
        ...currentWorkout,
        {
          name: selectedExercise,
          sets: [{ weight: 0, reps: 0 }],
        },
      ]);
      setSelectedExercise("");
    }
  };

  const addSet = (exerciseIndex: number) => {
    const updatedWorkout = [...currentWorkout];
    updatedWorkout[exerciseIndex].sets.push({ weight: 0, reps: 0 });
    setCurrentWorkout(updatedWorkout);
  };

  const updateSet = (
    exerciseIndex: number,
    setIndex: number,
    field: "weight" | "reps",
    value: number
  ) => {
    const updatedWorkout = [...currentWorkout];
    updatedWorkout[exerciseIndex].sets[setIndex][field] = value;
    setCurrentWorkout(updatedWorkout);
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    const updatedWorkout = [...currentWorkout];
    updatedWorkout[exerciseIndex].sets.splice(setIndex, 1);
    setCurrentWorkout(updatedWorkout);
  };

  const removeExercise = (exerciseIndex: number) => {
    const updatedWorkout = [...currentWorkout];
    updatedWorkout.splice(exerciseIndex, 1);
    setCurrentWorkout(updatedWorkout);
  };

  const saveWorkout = async () => {
    if (workoutName && currentWorkout.length > 0) {
      try {
        const totalVolume = currentWorkout.reduce((total, exercise) => {
          return (
            total +
            exercise.sets.reduce((exerciseTotal, set) => {
              return exerciseTotal + set.weight * set.reps;
            }, 0)
          );
        }, 0);

        console.log({
          workoutName,
          exercises: currentWorkout,
          date: new Date().toISOString(),
          totalVolume,
        });
        await axios.post(
          `${API_END_POINT}/api/workout-tracker/${userId}/add-workout`,
          {
            workoutName,
            exercises: currentWorkout,
            date: new Date().toISOString(),
            totalVolume,
          }
        );
        toast({
          title: "Success",
          description: "Workout saved successfully!",
        });
        setWorkoutName("");
        setCurrentWorkout([]);
        fetchWorkouts();
      } catch (error) {
        console.error("Error saving workout:", error);
        toast({
          title: "Error",
          description: "Failed to save workout. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      {/* Responsive Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-bold text-teal-700">
            Workout Tracker
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mt-2">
            Log your workouts and track your progress effortlessly.
          </p>
        </div>
        <Button
          variant="outline"
          className="w-full sm:w-auto border-teal-400 text-teal-600 hover:bg-teal-50"
          asChild
        >
          <Link
            href="/workout-tracker/weekly-progress"
            className="flex items-center justify-center gap-2"
          >
            View Weekly Progress
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </header>

      {/* Add New Workout Section */}
      <Card className="shadow-md border border-teal-300 mb-8">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-orange-600">
            Add New Workout
          </CardTitle>
          <CardDescription className="text-gray-500">
            Record your workout details below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              placeholder="Workout Name"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              className="w-full border-teal-400"
            />

            <Select
              value={selectedMuscleGroup}
              onValueChange={setSelectedMuscleGroup}
            >
              <SelectTrigger className="w-full border-teal-400">
                <SelectValue placeholder="Select muscle group" />
              </SelectTrigger>
              <SelectContent>
                {muscleGroups.map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedMuscleGroup && (
              <Select
                value={selectedExercise}
                onValueChange={setSelectedExercise}
              >
                <SelectTrigger className="w-full border-teal-400">
                  <SelectValue placeholder="Select exercise" />
                </SelectTrigger>
                <SelectContent>
                  {exercisesByMuscleGroup[selectedMuscleGroup].map(
                    (exercise) => (
                      <SelectItem key={exercise} value={exercise}>
                        {exercise}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            )}
          </div>

          <Button
            onClick={addExercise}
            className="text-white bg-orange-500 hover:bg-orange-600 w-full"
          >
            Add Exercise
          </Button>

          {currentWorkout.length > 0 && (
            <div className="bg-teal-50 p-4 rounded-lg shadow-md border border-teal-300">
              <h3 className="text-lg font-semibold text-teal-700 mb-4">
                Current Workout
              </h3>
              {currentWorkout.map((exercise, exerciseIndex) => (
                <div key={exerciseIndex} className="mb-6 last:mb-0">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-md font-semibold text-teal-600">
                      {exercise.name}
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExercise(exerciseIndex)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Set</TableHead>
                        <TableHead>Weight (lbs)</TableHead>
                        <TableHead>Reps</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {exercise.sets.map((set, setIndex) => (
                        <TableRow key={setIndex}>
                          <TableCell>{setIndex + 1}</TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={set.weight}
                              onChange={(e) =>
                                updateSet(
                                  exerciseIndex,
                                  setIndex,
                                  "weight",
                                  Number(e.target.value)
                                )
                              }
                              className="w-full"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={set.reps}
                              onChange={(e) =>
                                updateSet(
                                  exerciseIndex,
                                  setIndex,
                                  "reps",
                                  Number(e.target.value)
                                )
                              }
                              className="w-full"
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSet(exerciseIndex, setIndex)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addSet(exerciseIndex)}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Set
                  </Button>
                </div>
              ))}
              <Button
                onClick={saveWorkout}
                className="mt-4 bg-teal-500 text-white w-full hover:bg-teal-600"
              >
                Save Workout
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Today's Workouts Section */}
      <Card className="shadow-md border border-orange-300">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle className="text-lg font-semibold text-orange-600">
            Today&apos;s Workouts
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={fetchWorkouts}
            className="text-orange-600 hover:text-orange-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M3 21v-5h5" />
            </svg>
          </Button>
        </CardHeader>
        <CardContent>
          {workouts.length > 0 ? (
            <div className="space-y-4">
              <div className="grid gap-4">
                {workouts.map((workout, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded-lg shadow-sm bg-teal-50 border-teal-300"
                  >
                    <div className="flex flex-col sm:flex-row justify-between mb-2 gap-2">
                      <span className="font-semibold text-teal-800">
                        {workout.workoutName}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {workout.exercises.map((exercise, exerciseIndex) => (
                        <div
                          key={exerciseIndex}
                          className="bg-white p-2 rounded-md"
                        >
                          <h4 className="font-medium text-teal-700">
                            {exercise.name}
                          </h4>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[100px]">Set</TableHead>
                                <TableHead>Weight (lbs)</TableHead>
                                <TableHead>Reps</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {exercise.sets.map((set, setIndex) => (
                                <TableRow key={setIndex}>
                                  <TableCell>{setIndex + 1}</TableCell>
                                  <TableCell>{set.weight}</TableCell>
                                  <TableCell>{set.reps}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No workouts recorded for today.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
