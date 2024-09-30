'use client'
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";


const page = () => {

    const router = useRouter()  

    useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (!username && !password) {
      router.push("/sign-in"); 
    }
    else{
       router.push("/admin/dashboard"); 
    }
  }, [router]);
  return <div>CLIENT PAGE</div>;
};

export default page;
