import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const dietPlans = [
  { id: 1, name: "Weight Loss Plan", description: "Low-calorie diet plan for effective weight loss" },
  { id: 2, name: "Muscle Gain Plan", description: "High-protein diet plan for muscle growth" },
  { id: 3, name: "Balanced Nutrition", description: "Well-rounded diet plan for overall health" },
]

export default function DietPlansPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
        <h1 className="text-3xl font-bold">Diet Plans</h1>
        <Button>Create New Plan</Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dietPlans.map((plan) => (
          <Card key={plan.id}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

