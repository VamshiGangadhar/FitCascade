import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to GymSync</h1>
      <p className="text-xl mb-8">
        Connecting gym owners and fitness enthusiasts
      </p>
      <div className="space-x-4">
        <Link href="/gym-owner">
          <Button size="lg">I&apos;m a Gym Owner</Button>
        </Link>
        <Link href="/gym-goer">
          <Button size="lg" variant="outline">
            I&apos;m a Gym-Goer
          </Button>
        </Link>
      </div>
    </div>
  );
}
