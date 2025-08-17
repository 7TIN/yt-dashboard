"use client";

import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import GoogleSignin from "./GoogleSignin";

export default function LoginForm() {
  // If later you want email/password, you can add react-hook-form here
  return (
    <main className="flex justify-center items-center min-h-screen">
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form>
            <form className="flex flex-col gap-2">
              <Suspense fallback={<div>Loading Google Sign-in...</div>}>
                <GoogleSignin />
              </Suspense>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
