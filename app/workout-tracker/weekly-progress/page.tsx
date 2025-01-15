"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { TooltipItem } from "chart.js";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { API_END_POINT } from "@/app/constants/constants";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

interface Set {
  weight: number;
  reps: number;
}

interface Exercise {
  name: string;
  sets: Set[];
}

interface Workout {
  _id: string;
  date: string;
  exercises: Exercise[];
}

const muscleGroups = ["Chest", "Back", "Legs", "Shoulders", "Arms", "Core"];

const exercisesByMuscleGroup: { [key: string]: string[] } = {
  Chest: ["Bench Press", "Incline Press", "Chest Flyes", "Push-Ups"],
  Back: ["Pull-Ups", "Rows", "Lat Pulldowns", "Deadlifts"],
  Legs: ["Squats", "Leg Press", "Lunges", "Leg Curls"],
  Shoulders: ["Overhead Press", "Lateral Raises", "Front Raises", "Shrugs"],
  Arms: ["Bicep Curls", "Tricep Extensions", "Hammer Curls", "Skull Crushers"],
  Core: ["Crunches", "Planks", "Russian Twists", "Leg Raises"],
};

export default function WeeklyProgressPage() {
  const [weeklyData, setWeeklyData] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>("");
  const [selectedExercise, setSelectedExercise] = useState<string>("");
  const userId = localStorage.getItem("user_id");
  const { toast } = useToast();

  useEffect(() => {
    fetchWeeklyData();
  }, []);

  useEffect(() => {
    if (
      selectedMuscleGroup &&
      exercisesByMuscleGroup[selectedMuscleGroup].length > 0
    ) {
      setSelectedExercise(exercisesByMuscleGroup[selectedMuscleGroup][0]);
    } else {
      setSelectedExercise("");
    }
  }, [selectedMuscleGroup]);

  const fetchWeeklyData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_END_POINT}/api/workout-tracker/${userId}/week-summary`
      );
      const workouts = response.data.workouts || [];
      setWeeklyData(workouts);

      if (muscleGroups.length > 0 && !selectedMuscleGroup) {
        setSelectedMuscleGroup(muscleGroups[0]);
      }
    } catch (error) {
      console.error("Error fetching weekly data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch weekly data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getExerciseData = () => {
    const exerciseData: { [key: string]: number } = {};
    weeklyData.forEach((workout) => {
      const date = new Date(workout.date).toLocaleDateString();
      const exercise = workout.exercises.find(
        (e) => e.name === selectedExercise
      );
      if (exercise) {
        const volume = exercise.sets.reduce(
          (total, set) => total + set.weight * set.reps,
          0
        );
        exerciseData[date] = (exerciseData[date] || 0) + volume;
      }
    });
    return exerciseData;
  };

  const chartData = {
    labels: Object.keys(getExerciseData()),
    datasets: [
      {
        label: `${selectedExercise} - Total Volume (lbs)`,
        data: Object.values(getExerciseData()),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"line">) =>
            `${tooltipItem.raw as number} lbs`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Volume (lbs)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      {/* Responsive Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-teal-700">
            Weekly Workout Progress
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mt-2">
            Track your workout volume over the past week
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="icon"
            onClick={fetchWeeklyData}
            className="text-teal-600 hover:text-teal-800"
          >
            <RefreshCw className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            className="flex-1 sm:flex-none border-teal-400 text-teal-600 hover:bg-teal-50 flex items-center gap-2"
            asChild
          >
            <Link href="/workout-tracker">
              <ArrowLeft className="h-4 w-4" />
              Back to Tracker
            </Link>
          </Button>
        </div>
      </div>

      {/* Exercise Selector */}
      <Card className="shadow-md border border-teal-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-orange-600">
            Select Exercise
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            value={selectedMuscleGroup}
            onValueChange={setSelectedMuscleGroup}
          >
            <SelectTrigger className="w-full border-teal-400">
              <SelectValue placeholder="Select a muscle group" />
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
                <SelectValue placeholder="Select an exercise" />
              </SelectTrigger>
              <SelectContent>
                {exercisesByMuscleGroup[selectedMuscleGroup].map((exercise) => (
                  <SelectItem key={exercise} value={exercise}>
                    {exercise}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </CardContent>
      </Card>

      {/* Progress Chart */}
      <Card className="shadow-md border border-teal-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-orange-600">
            Weekly Progress: {selectedExercise}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] sm:h-[400px]">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500 flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Loading data...
                </p>
              </div>
            ) : Object.keys(getExerciseData()).length > 0 ? (
              <Line data={chartData} options={chartOptions} />
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">
                  No data available for {selectedExercise} in the past week.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Daily Breakdown */}
      <div className="space-y-4">
        {weeklyData.map((workout) => {
          const exercise = workout.exercises.find(
            (e) => e.name === selectedExercise
          );
          if (!exercise) return null;

          return (
            <Card
              key={workout._id}
              className="shadow-md border border-teal-300"
            >
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <CardTitle className="text-md font-medium">
                    {new Date(workout.date).toLocaleDateString()}
                  </CardTitle>
                  <div className="text-sm text-orange-600 font-medium px-2 py-1 bg-orange-50 rounded-md">
                    Total Volume:{" "}
                    {exercise.sets.reduce(
                      (total, set) => total + set.weight * set.reps,
                      0
                    )}{" "}
                    lbs
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                  <h3 className="text-base font-semibold text-teal-700 mb-2">
                    {selectedExercise}
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                    {exercise.sets.map((set, index) => (
                      <li key={index} className="break-words">
                        Set {index + 1}: {set.weight} lbs x {set.reps} reps
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
