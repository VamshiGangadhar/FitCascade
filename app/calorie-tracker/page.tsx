"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import foodItems from "./foodItems";

interface FoodItem {
  name: string;
  weight: number;
  calories?: number;
}

interface Meal {
  mealName: string;
  foodItems: FoodItem[];
  totalCalories: number;
}

export default function CalorieTrackerPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [mealName, setMealName] = useState("");
  const [selectedFood, setSelectedFood] = useState("");
  const [weight, setWeight] = useState("");
  const [currentMeal, setCurrentMeal] = useState<FoodItem[]>([]);
  const userId = localStorage.getItem("user_id");
  const { toast } = useToast();

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await axios.get(
        `${API_END_POINT}/api/calorie-tracker/${userId}/summary`
      );
      setMeals(response.data.meals || []);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  const addFoodItem = () => {
    if (selectedFood && weight) {
      setCurrentMeal([
        ...currentMeal,
        { name: selectedFood, weight: Number(weight) },
      ]);
      setSelectedFood("");
      setWeight("");
    }
  };

  const saveMeal = async () => {
    if (mealName && currentMeal.length > 0) {
      try {
        await axios.post(
          `${API_END_POINT}/api/calorie-tracker/${userId}/meal`,
          {
            mealName,
            foodItems: currentMeal,
          }
        );
        toast({
          title: "Success",
          description: "Meal saved successfully!",
        });
        setMealName("");
        setCurrentMeal([]);
        fetchMeals();
      } catch (error) {
        console.error("Error saving meal:", error);
        toast({
          title: "Error",
          description: "Failed to save meal. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold text-teal-700 mb-4">
          Calorie Tracker
        </h1>
        <p className="text-lg text-gray-600">
          Keep track of your meals and calories effortlessly.
        </p>
      </header>

      {/* Add New Meal Section */}
      <Card className="shadow-md border border-teal-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-orange-600">
            Add New Meal
          </CardTitle>
          <CardDescription className="text-gray-500">
            Record your meal details below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Meal Type */}
            <Select value={mealName} onValueChange={setMealName}>
              <SelectTrigger className="w-full border-teal-400">
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Breakfast">Breakfast</SelectItem>
                <SelectItem value="Lunch">Lunch</SelectItem>
                <SelectItem value="Dinner">Dinner</SelectItem>
                <SelectItem value="Snack">Snack</SelectItem>
              </SelectContent>
            </Select>

            {/* Food Item */}
            <Select value={selectedFood} onValueChange={setSelectedFood}>
              <SelectTrigger className="w-full border-teal-400">
                <SelectValue placeholder="Select food item" />
              </SelectTrigger>
              <SelectContent>
                {foodItems.map((food) => (
                  <SelectItem key={food} value={food}>
                    {food}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Weight Input */}
            <Input
              type="number"
              placeholder="Weight (g)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border-teal-400"
            />
          </div>

          {/* Add Food Button */}
          <Button
            onClick={addFoodItem}
            className="text-white bg-orange-500 hover:bg-orange-600 w-full"
          >
            Add Food Item
          </Button>

          {/* Current Meal */}
          {currentMeal.length > 0 && (
            <div className="bg-teal-50 p-4 rounded-lg shadow-md border border-teal-300">
              <h3 className="text-lg font-semibold text-teal-700 mb-2">
                Current Meal
              </h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {currentMeal.map((item, index) => (
                  <li key={index}>
                    {item.name} - {item.weight}g
                  </li>
                ))}
              </ul>
              <Button
                onClick={saveMeal}
                className="mt-4 bg-teal-500 text-white w-full hover:bg-teal-600"
              >
                Save Meal
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Today's Meals Section */}
      <Card className="shadow-md border border-orange-300">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-orange-600">
            Today&apos;s Meals
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={fetchMeals}
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
          {meals.length > 0 ? (
            <div className="space-y-4">
              <div className="text-lg font-semibold text-orange-700">
                Total Calories Today:{" "}
                {meals.reduce((sum, meal) => sum + meal.totalCalories, 0)}
              </div>
              {meals.map((meal, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-lg shadow-sm bg-teal-50 border-teal-300"
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-teal-800">
                      {meal.mealName}
                    </span>
                    <span className="text-gray-600">
                      {meal.totalCalories} calories
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-gray-600">
                    {meal.foodItems.map((item, index) => (
                      <li key={index}>
                        {item.name} - {item.weight}g
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No meals recorded for today.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
