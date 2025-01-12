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

interface FoodItem {
  _id: string;
  name: string;
  weight: number;
  calories: number;
}

interface Meal {
  _id: string;
  date: string;
  mealName: string;
  totalCalories: number;
  foodItems: FoodItem[];
}

export default function WeeklyProgressPage() {
  const [weeklyData, setWeeklyData] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("user_id");
  const { toast } = useToast();

  useEffect(() => {
    fetchWeeklyData();
  }, []);

  const fetchWeeklyData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_END_POINT}/api/calorie-tracker/${userId}/weekly-summary`
      );
      setWeeklyData(response.data.meals || []);
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

  const aggregatedData = weeklyData.reduce<{ [key: string]: number }>(
    (acc, meal) => {
      const date = new Date(meal.date).toLocaleDateString();
      acc[date] = (acc[date] || 0) + meal.totalCalories;
      return acc;
    },
    {}
  );

  const chartData = {
    labels: Object.keys(aggregatedData),
    datasets: [
      {
        label: "Calories Consumed",
        data: Object.values(aggregatedData),
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
            `${tooltipItem.raw as number} calories`,
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
          text: "Calories",
        },
        beginAtZero: true,
      },
    },
  };

  const mealsByDate = weeklyData.reduce<{ [key: string]: Meal[] }>(
    (acc, meal) => {
      const date = new Date(meal.date).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(meal);
      return acc;
    },
    {}
  );

  const calculateDailyTotal = (meals: Meal[]) => {
    return meals.reduce((sum, meal) => sum + meal.totalCalories, 0);
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      {/* Responsive Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-teal-700">
            Weekly Progress
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mt-2">
            Track your calorie consumption over the past week
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
            <Link href="/calorie-tracker">
              <ArrowLeft className="h-4 w-4" />
              Back to Tracker
            </Link>
          </Button>
        </div>
      </div>

      {/* Progress Chart */}
      <Card className="shadow-md border border-teal-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-orange-600">
            Weekly Calorie Progress
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
            ) : Object.keys(aggregatedData).length > 0 ? (
              <Line data={chartData} options={chartOptions} />
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">
                  No data available for the past week.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Daily Breakdown */}
      <div className="space-y-4">
        {Object.entries(mealsByDate).map(([date, meals]) => (
          <Card key={date} className="shadow-md border border-teal-300">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <CardTitle className="text-md font-medium">{date}</CardTitle>
                <div className="text-sm text-orange-600 font-medium px-2 py-1 bg-orange-50 rounded-md">
                  Total: {calculateDailyTotal(meals)} calories
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {meals.map((meal) => (
                  <div
                    key={meal._id}
                    className="bg-teal-50 p-4 rounded-lg border border-teal-200"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                      <h3 className="text-base font-semibold text-teal-700">
                        {meal.mealName}
                      </h3>
                      <span className="text-sm text-orange-600 font-medium">
                        {meal.totalCalories} calories
                      </span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                      {meal.foodItems.map((item) => (
                        <li key={item._id} className="break-words">
                          {item.name} - {item.weight}g ({item.calories}{" "}
                          calories)
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
