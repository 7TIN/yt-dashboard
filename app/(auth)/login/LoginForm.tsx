"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GoogleSignin from "./GoogleSignin";
import { Suspense } from "react";

export default function LoginForm() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Suspense fallback={<div>Loading login form...</div>}>
              <GoogleSignin />
            </Suspense>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
