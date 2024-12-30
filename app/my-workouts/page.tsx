import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const workouts = [
  { id: 1, name: "Full Body Strength", completedSessions: 3, totalSessions: 12 },
  { id: 2, name: "Cardio Blast", completedSessions: 5, totalSessions: 8 },
  { id: 3, name: "Flexibility and Yoga", completedSessions: 2, totalSessions: 10 },
]

export default function MyWorkoutsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Workouts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <Card key={workout.id}>
            <CardHeader>
              <CardTitle>{workout.name}</CardTitle>
              <CardDescription>
                {workout.completedSessions} of {workout.totalSessions} sessions completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress 
                value={(workout.completedSessions / workout.totalSessions) * 100} 
                className="mb-4"
              />
              <Button className="w-full">Continue Workout</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

