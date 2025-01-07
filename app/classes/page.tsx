import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const classes = [
  { id: 1, name: "Yoga", instructor: "Jane Smith", time: "Mon, Wed, Fri 9:00 AM", capacity: 20, enrolled: 15 },
  { id: 2, name: "HIIT", instructor: "Mike Johnson", time: "Tue, Thu 6:00 PM", capacity: 15, enrolled: 12 },
  { id: 3, name: "Spin", instructor: "Sarah Lee", time: "Mon, Wed, Fri 7:00 PM", capacity: 25, enrolled: 20 },
]

export default function ClassesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold">Class Management</h1>
        <Button>Add New Class</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Class Schedule</CardTitle>
          <CardDescription>Manage your gym's class schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Enrolled</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((class_) => (
                  <TableRow key={class_.id}>
                    <TableCell>{class_.name}</TableCell>
                    <TableCell>{class_.instructor}</TableCell>
                    <TableCell>{class_.time}</TableCell>
                    <TableCell>{class_.capacity}</TableCell>
                    <TableCell>{class_.enrolled}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

