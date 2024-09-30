"use client";
import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useToast } from "~/components/ui/use-toast";

const LoginForm = () => {
  // State for form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { toast } = useToast();
  const router = useRouter();

  // Mutation for login
  const {
    mutateAsync: login,
    isError,
    error,
  } = api.login.loginUser.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        // Store credentials in localStorage if login is successful
        if (typeof window !== "undefined") {
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);
        }
        router.push("/admin/dashboard");
      } else {
        toast({
          title: "Password or username is incorrect",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Password or username is incorrect",
      });
    },
  });

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await login({ username, password });
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  useEffect(() => {
    // Check localStorage for credentials in the browser
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("username");
      const storedPassword = localStorage.getItem("password");

      if (storedUsername === "admin" && storedPassword === "admin") {
        router.push("/admin/dashboard");
      }
    }
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">
            <div className="flex w-full justify-between py-5">
              <Label className="text-2xl">Login</Label>
              <div>
                <img src="logo.jpg" width={20} className="rounded-full" />
              </div>
            </div>
          </CardTitle>
          <CardDescription>
            Enter your username and password below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          {isError && <p className="text-red-500">{error.message}</p>}
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
