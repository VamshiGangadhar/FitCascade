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

const foodItems = [
  "rice",
  "potato",
  "carrot",
  "water",
  "toor dal",
  // Add more food items as needed
];

interface FoodItem {
  name: string;
  weight: number;
}

interface Meal {
  mealName: string;
  foodItems: FoodItem[];
}

export default function CalorieTrackerPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [mealName, setMealName] = useState("");
  const [selectedFood, setSelectedFood] = useState("");
  const [weight, setWeight] = useState("");
  const [currentMeal, setCurrentMeal] = useState<FoodItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch meals for the current day
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await axios.get(
        `${API_END_POINT}/api/calorie-tracker/userid`
      );
      setMeals(response.data);
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
          `${API_END_POINT}/api/calorie-tracker/userid/meal`,
          {
            mealName,
            foodItems: currentMeal,
          }
        );
        toast({
          title: "Success",
          description: "Meal saved successfully",
        });
        setMealName("");
        setCurrentMeal([]);
        fetchMeals();
      } catch (error) {
        console.error("Error saving meal:", error);
        toast({
          title: "Error",
          description: "Failed to save meal",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Calorie Tracker</h1>
      <Card>
        <CardHeader>
          <CardTitle>Add New Meal</CardTitle>
          <CardDescription>Track your daily meals and calories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Meal Name (e.g., Breakfast, Lunch, Dinner)"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
            />
            <div className="flex space-x-2">
              <Select value={selectedFood} onValueChange={setSelectedFood}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select food" />
                </SelectTrigger>
                <SelectContent>
                  {foodItems.map((food) => (
                    <SelectItem key={food} value={food}>
                      {food}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Weight (g)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <Button onClick={addFoodItem}>Add Food</Button>
            </div>
            {currentMeal.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Current Meal:</h3>
                <ul className="list-disc list-inside">
                  {currentMeal.map((item, index) => (
                    <li key={index}>
                      {item.name} - {item.weight}g
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Button onClick={saveMeal}>Save Meal</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Meals</CardTitle>
        </CardHeader>
        <CardContent>
          {meals.length > 0 ? (
            <ul className="space-y-4">
              {meals.map((meal, index) => (
                <li key={index}>
                  <h3 className="font-semibold">{meal.mealName}</h3>
                  <ul className="list-disc list-inside">
                    {meal.foodItems.map((item, foodIndex) => (
                      <li key={foodIndex}>
                        {item.name} - {item.weight}g
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No meals recorded for today.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
