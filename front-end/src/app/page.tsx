"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./globals.css";
import { useUser } from "@/context/UserContext";
import { Class } from "@/interface/interface";
import { axioslib } from "@/lib/axioslib";
import Homepage from "@/components/Home/HomePage";
import LoadingScreen from "@/components/Loading/LoadingScreen";

const Home: React.FC = () => {
  const { user } = useUser();
  const [role, setRole] = useState<'teacher' | 'student' | null>(null);
  const [enrolledClasses, setEnrolledClasses] = useState<{ classes: Class[] }>({ classes: [] });
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  useEffect(() => {
    if (user) {
      setRole(user.role as 'teacher' | 'student');
      fetchEnrolledClasses(user._id);
    }
  }, [user]);

  const fetchEnrolledClasses = async (userID: string) => {
    try {
      const response = await axioslib.get(`/api/user/getenrollment/${userID}`);
      setEnrolledClasses(response.data || { classes: [] });
    } catch (error) {
      console.error("Error fetching enrolled classes:", error);
      setEnrolledClasses({ classes: [] });
    }
  };

  if (!role) {
    return <LoadingScreen />;
  }

  return <Homepage role={role} enrolledClasses={enrolledClasses} />;
};

export default Home;
