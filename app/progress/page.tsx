import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const weightData = [
  { date: '2023-01-01', weight: 180 },
  { date: '2023-02-01', weight: 178 },
  { date: '2023-03-01', weight: 175 },
  { date: '2023-04-01', weight: 173 },
  { date: '2023-05-01', weight: 170 },
  { date: '2023-06-01', weight: 168 },
]

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Track Progress</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weight Progress</CardTitle>
            <CardDescription>Track your weight over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="weight" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Fitness Goals</CardTitle>
            <CardDescription>Set and track your fitness goals</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <span>Reach 160 lbs</span>
                <Button size="sm">Update</Button>
              </li>
              <li className="flex justify-between items-center">
                <span>Run 5k under 25 minutes</span>
                <Button size="sm">Update</Button>
              </li>
              <li className="flex justify-between items-center">
                <span>Bench press 200 lbs</span>
                <Button size="sm">Update</Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

