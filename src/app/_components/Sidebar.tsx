"use client";
import Link from "next/link";
import {
  Bell,
  CircleUser,
  Home,
  KeyboardMusic,
  LayoutDashboard,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  SquareArrowDown,
  User,
  Users,
  Users2,
} from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

import React from "react";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname
import { Label } from "~/components/ui/label";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current pathname

  // Function to check if the route is active
  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <div className="hidden border-r bg-muted md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <img src="/logo.jpg" width={25} className="rounded-full" />
            <span className="">NLCM</span>
          </Link>
        </div>
        <div className="mt-6 flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive("/admin/dashboard")
                  ? "bg-teal-700 text-white" // Active styles
                  : "text-muted-foreground" // Default styles
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/attendance"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive("/admin/attendance")
                  ? "bg-teal-700 text-white"
                  : "text-muted-foreground"
              }`}
            >
              <SquareArrowDown className="h-4 w-4" />
              Attendance
            </Link>
            <Link
              href="/admin/training"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive("/admin/training")
                  ? "bg-teal-700 text-white"
                  : "text-muted-foreground"
              }`}
            >
              <KeyboardMusic className="h-4 w-4" />
              Trainee Management
            </Link>
            <Link
              href="/admin/members"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive("/admin/members")
                  ? "bg-teal-700 text-white"
                  : "text-muted-foreground"
              }`}
            >
              <Users2 className="h-4 w-4" />
              Members
            </Link>
            <Link
              href="/admin/reports"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive("/admin/reports")
                  ? "bg-teal-700 text-white"
                  : "text-muted-foreground"
              }`}
            >
              <LineChart className="h-4 w-4" />
              Reports
            </Link>
          </nav>
        </div>
        <div className="mt-auto py-10">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle className="mb-3 text-lg">- 2 TIMOTHY 1:7</CardTitle>
              <CardDescription>
                <Label className="text-xs tracking-widest">
                  "For God gave us a spirit not of fear but of power and love
                  and self-control."
                </Label>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button
                size="sm"
                className="mt-3 w-full bg-teal-700  hover:brightness-150"
              >
                NLCM Website
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
