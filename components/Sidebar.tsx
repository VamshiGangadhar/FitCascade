"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart,
  Dumbbell,
  Users,
  Calendar,
  UserCircle,
  ClipboardList,
  Utensils,
  TrendingUp,
} from "lucide-react";

const role = localStorage.getItem("role");

const sidebarItemsByRole = {
  user: [
    { name: "Dashboard", href: "/dashboard", icon: BarChart },
    { name: "Book Class", href: "/book-class", icon: Calendar },
    { name: "My Workouts", href: "/my-workouts", icon: Dumbbell },
    { name: "Progress", href: "/progress", icon: TrendingUp },
    { name: "Calorie Tracker", href: "/calorie-tracker", icon: Utensils },
  ],
  trainer: [
    { name: "Dashboard", href: "/dashboard", icon: BarChart },
    { name: "Clients", href: "/clients", icon: Users },
    { name: "Workout Plans", href: "/workout-plans", icon: ClipboardList },
    { name: "Diet Plans", href: "/diet-plans", icon: Utensils },
    { name: "Schedule", href: "/schedule", icon: Calendar },
  ],
  admin: [
    { name: "Dashboard", href: "/dashboard", icon: BarChart },
    { name: "Classes", href: "/classes", icon: Calendar },
    { name: "Members", href: "/members", icon: Users },
    { name: "Equipment", href: "/equipment", icon: Dumbbell },
    { name: "Trainers", href: "/trainers", icon: UserCircle },
  ],
};

export default function Sidebar() {
  const pathname = usePathname();
  const sidebarItems =
    sidebarItemsByRole[role as keyof typeof sidebarItemsByRole] || [];
  console.log(sidebarItems);
  console.log(role);

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <Dumbbell className="h-6 w-6" />
            <span className="">FitCascade</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 overflow-auto"></ScrollArea>
        <div className="flex flex-col gap-2 p-4 pt-0">
          {sidebarItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className={cn(
                "w-full justify-start",
                pathname === item.href
                  ? "bg-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-700"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
