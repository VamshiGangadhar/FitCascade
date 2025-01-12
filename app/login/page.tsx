"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { UserAuthForm } from "@/components/user-auth-form";

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const navigateToDashboard = async () => {
      if (isAuthenticated) {
        await router.replace("/dashboard");
      }
    };
    navigateToDashboard();
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen w-full">
      <div className="container mx-auto flex min-h-screen flex-col lg:grid lg:grid-cols-2 lg:gap-4">
        {/* Left section - Branding and Testimonial */}
        <div className="relative flex flex-col bg-zinc-900 p-6 text-white lg:p-10">
          <div className="flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            FitCascade
          </div>

          {/* Hero Images - Visible on all screen sizes */}
          {/* <div className="my-6 w-full">
            <Image
              src="/examples/authentication-light.png"
              width={1280}
              height={843}
              alt="Authentication"
              className="block w-full rounded-lg object-cover dark:hidden"
            />
            <Image
              src="/examples/authentication-dark.png"
              width={1280}
              height={843}
              alt="Authentication"
              className="hidden w-full rounded-lg object-cover dark:block"
            />
          </div> */}

          {/* Testimonial */}
          <div className="mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;FitCascade has revolutionized how I manage my fitness
                routine. It&apos;s like having a personal trainer in my
                pocket!&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>

        {/* Right section - Login Form */}
        <div className="flex items-center justify-center p-6 lg:p-8">
          <div className="mx-auto w-full max-w-sm space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your username below to login to your account
              </p>
            </div>

            <UserAuthForm />

            <p className="px-2 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
