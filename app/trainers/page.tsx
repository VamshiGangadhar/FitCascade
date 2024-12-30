import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const trainers = [
  { id: 1, name: "John Doe", specialty: "Strength Training", experience: "5 years" },
  { id: 2, name: "Jane Smith", specialty: "Yoga", experience: "8 years" },
  { id: 3, name: "Mike Johnson", specialty: "Cardio", experience: "6 years" },
]

export default function TrainersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
        <h1 className="text-3xl font-bold">Personal Trainers</h1>
        <Button>Add New Trainer</Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trainers.map((trainer) => (
          <Card key={trainer.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`/trainers/${trainer.id}.jpg`} alt={trainer.name} />
                  <AvatarFallback>{trainer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{trainer.name}</CardTitle>
                  <CardDescription>{trainer.specialty}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>Experience: {trainer.experience}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Book Session</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

