'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";


export default function Dashboard() {
  const role = localStorage.getItem("role");
  const getDefaultTab = () => {
    switch (role) {
      case 'admin':
        return 'gym-owner';
      case 'trainer':
        return 'trainer';
      case 'user':
        return 'gym-goer';
      default:
        return 'overview';
    }
  };
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <Tabs defaultValue={getDefaultTab()} className="space-y-4">
        <TabsList className="w-full overflow-x-auto">
          {role === 'admin' && <TabsTrigger value="gym-owner">Gym Owner</TabsTrigger>}
          {role === 'trainer' && <TabsTrigger value="trainer">Trainer</TabsTrigger>}
          {role === 'user' && <TabsTrigger value="gym-goer">Gym-Goer</TabsTrigger>}
        </TabsList>

        {role === 'admin' && (
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
        )}

        {role === 'trainer' && (
          <TabsContent value="trainer" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Trainer Dashboard</CardTitle>
                <CardDescription>Manage your classes and clients</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2"></CardContent>
                <div className="grid gap-2 sm:grid-cols-2">
                  <Link href="/schedule"><Button className="w-full">View Schedule</Button></Link>
                  <Link href="/clients"><Button className="w-full">Manage Clients</Button></Link>
                  <Link href="/workout-plans"><Button className="w-full">Create Workout Plans</Button></Link>
                  <Link href="/diet-plans"><Button className="w-full">Create Diet Plans</Button></Link>
                </div>
              </Card>
            </TabsContent>
        )}

        {role === 'user' && (
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
                  <Link href="/calorie-tracker"><Button className="w-full">Calorie Tracker</Button></Link>
                  <Link href="/workout-tracker"><Button className="w-full">Workout Tracker</Button></Link>
                  {/* <link href="/calorie-tracker"><Button className="w-full">Calorie Tracker</Button></link> */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
