"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Use `next/navigation` for App Router
import Header from "../_components/Header";
import Sidebar from "../_components/Sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (username !== "admin" || password !== "admin") {
      router.push("/sign-in"); // Redirect to the sign-in page
    }
  }, [router]);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
