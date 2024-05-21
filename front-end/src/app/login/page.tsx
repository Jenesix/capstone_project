// pages/login.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "../globals.css";
import LoginCard from "@/components/Login/LoginCard";
import { useUser } from "@/context/UserContext";

export default function Login() {
  const { user, isLogin } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLogin) {
      router.push('/'); // Redirect to the homepage if the user is already logged in
    }
  }, [isLogin, router]);

  if (isLogin) {
    return <div>Loading...</div>; // Optionally show a loading state while redirecting
  }

  return (
    <>
      <LoginCard />
    </>
  );
}
