import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const classes = [
  { id: 1, name: "Yoga", instructor: "Jane Smith", time: "Mon, Wed, Fri 9:00 AM", availableSpots: 5 },
  { id: 2, name: "HIIT", instructor: "Mike Johnson", time: "Tue, Thu 6:00 PM", availableSpots: 3 },
  { id: 3, name: "Spin", instructor: "Sarah Lee", time: "Mon, Wed, Fri 7:00 PM", availableSpots: 5 },
]

export default function BookClassPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Book a Class</h1>
      <Card>
        <CardHeader>
          <CardTitle>Available Classes</CardTitle>
          <CardDescription>Browse and book fitness classes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Available Spots</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((class_) => (
                  <TableRow key={class_.id}>
                    <TableCell>{class_.name}</TableCell>
                    <TableCell>{class_.instructor}</TableCell>
                    <TableCell>{class_.time}</TableCell>
                    <TableCell>{class_.availableSpots}</TableCell>
                    <TableCell>
                      <Button size="sm">Book Now</Button>
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

