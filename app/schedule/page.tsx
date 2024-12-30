import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"

export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Trainer Schedule</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Schedule</CardTitle>
            <CardDescription>Manage your training sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" className="rounded-md border" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your next training appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">John Doe - Weight Training</p>
                  <p className="text-sm text-gray-500">Today, 2:00 PM</p>
                </div>
                <Button variant="outline" size="sm">Reschedule</Button>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Jane Smith - Yoga</p>
                  <p className="text-sm text-gray-500">Tomorrow, 10:00 AM</p>
                </div>
                <Button variant="outline" size="sm">Reschedule</Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

