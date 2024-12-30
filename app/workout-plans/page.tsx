import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const workoutPlans = [
  { id: 1, name: "Beginner Strength Training", description: "A 4-week program for beginners to build strength" },
  { id: 2, name: "Intermediate HIIT", description: "High-intensity interval training for intermediate fitness levels" },
  { id: 3, name: "Advanced Bodyweight Routine", description: "Challenging bodyweight exercises for advanced athletes" },
]

export default function WorkoutPlansPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold">Workout Plans</h1>
        <Button>Create New Plan</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workoutPlans.map((plan) => (
          <Card key={plan.id}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Edit Plan</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Create New Workout Plan</CardTitle>
          <CardDescription>Design a new workout plan for your clients</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label htmlFor="plan-name" className="block text-sm font-medium text-gray-700">Plan Name</label>
              <Input id="plan-name" placeholder="Enter plan name" />
            </div>
            <div>
              <label htmlFor="plan-description" className="block text-sm font-medium text-gray-700">Description</label>
              <Textarea id="plan-description" placeholder="Enter plan description" />
            </div>
            <Button type="submit">Create Plan</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

