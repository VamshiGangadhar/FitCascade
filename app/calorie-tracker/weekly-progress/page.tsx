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
    <div className="space-y-8 p-6 max-w-4xl mx-auto">
      {/* Header with Navigation */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-left">
          <h1 className="text-4xl font-bold text-teal-700">Weekly Progress</h1>
          <p className="text-lg text-gray-600 mt-2">
            Track your calorie consumption over the past week
          </p>
        </div>
        <div className="flex gap-4">
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
            className="border-teal-400 text-teal-600 hover:bg-teal-50 flex items-center gap-2"
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
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500 flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                Loading data...
              </p>
            </div>
          ) : Object.keys(aggregatedData).length > 0 ? (
            <Line data={chartData} options={chartOptions} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No data available for the past week.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Daily Breakdown */}
      <div className="space-y-6">
        {Object.entries(mealsByDate).map(([date, meals]) => (
          <Card key={date} className="shadow-md border border-teal-300">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-md font-medium">{date}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Total: {calculateDailyTotal(meals)} calories
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {meals.map((meal) => (
                  <div
                    key={meal._id}
                    className="bg-teal-50 p-4 rounded-lg border border-teal-200"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-teal-700">
                        {meal.mealName}
                      </h3>
                      <span className="text-orange-600 font-medium">
                        {meal.totalCalories} calories
                      </span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {meal.foodItems.map((item) => (
                        <li key={item._id}>
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
