import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function GymOwnerDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gym Owner Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Manage Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Create and manage your gym classes.</p>
            <Button>Add New Class</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Member Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">View and manage your gym members.</p>
            <Button>View Members</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Equipment Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Track and maintain your gym equipment.</p>
            <Button>Manage Equipment</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

