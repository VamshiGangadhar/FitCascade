import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="w-full overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="gym-owner">Gym Owner</TabsTrigger>
          <TabsTrigger value="trainer">Trainer</TabsTrigger>
          <TabsTrigger value="gym-goer">Gym-Goer</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">56</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$52,000</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Equipment Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98% Operational</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="gym-owner" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gym Management</CardTitle>
              <CardDescription>Manage your gym&apos;s operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid gap-2 sm:grid-cols-2">
                <Link href="/equipment"><Button className="w-full">Manage Equipment</Button></Link>
                <Link href="/classes"><Button className="w-full">Manage Classes</Button></Link>
                <Link href="/trainers"><Button className="w-full">Manage Trainers</Button></Link>
                <Link href="/members"><Button className="w-full">Manage Members</Button></Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trainer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trainer Dashboard</CardTitle>
              <CardDescription>Manage your classes and clients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid gap-2 sm:grid-cols-2">
                <Link href="/schedule"><Button className="w-full">View Schedule</Button></Link>
                <Link href="/clients"><Button className="w-full">Manage Clients</Button></Link>
                <Link href="/workout-plans"><Button className="w-full">Create Workout Plans</Button></Link>
                <Link href="/diet-plans"><Button className="w-full">Create Diet Plans</Button></Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="gym-goer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Member Dashboard</CardTitle>
              <CardDescription>Track your fitness journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid gap-2 sm:grid-cols-2">
                <Link href="/book-class"><Button className="w-full">Book a Class</Button></Link>
                <Link href="/my-workouts"><Button className="w-full">My Workouts</Button></Link>
                <Link href="/my-diet"><Button className="w-full">My Diet Plan</Button></Link>
                <Link href="/progress"><Button className="w-full">Track Progress</Button></Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

