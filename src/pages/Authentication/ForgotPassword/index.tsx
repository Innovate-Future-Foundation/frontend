"use client";

import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-[400px]">
        <CardContent className="pt-6 pb-8 px-8">
          {/* Logo */}
          <div className="mb-8">{/* Logo placeholder */}</div>

          {/* Title and description */}
          <div className="mb-8 space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">Forgot password?</h1>
            <p className="text-sm text-muted-foreground">No worries, we'll send you reset instructions.</p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>

            <Button type="submit" className="w-full bg-[#046FFB] hover:bg-blue-700">
              Reset password
            </Button>
          </form>

          {/* Back to login link */}
          <Button variant="link" className="mt-6 px-0 w-full justify-start text-[#046FFB]" onClick={() => navigate("/login")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to log in
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
