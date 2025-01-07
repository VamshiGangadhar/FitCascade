import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function GymGoerDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gym-Goer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Find Gyms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Discover gyms in your area.</p>
            <Button>Search Gyms</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Book Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Browse and book fitness classes.</p>
            <Button>View Classes</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Track Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Monitor your fitness journey.</p>
            <Button>View Progress</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calorie Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Track your daily calorie intake.</p>
            <Button asChild>
              <Link href="/calorie-tracker">Open Tracker</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

