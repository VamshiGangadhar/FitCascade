import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const plans = [
  { id: 1, name: "Basic", price: 29.99, features: ["Access to gym equipment", "Locker room access"] },
  { id: 2, name: "Standard", price: 49.99, features: ["Basic plan features", "Group fitness classes", "Sauna access"] },
  { id: 3, name: "Premium", price: 79.99, features: ["Standard plan features", "Personal trainer sessions", "Nutrition consultation"] },
]

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Membership Plans</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>${plan.price}/month</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Select Plan</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

