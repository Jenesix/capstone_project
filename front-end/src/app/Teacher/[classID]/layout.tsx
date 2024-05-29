"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import LoadingScreen from '@/components/Loading/LoadingScreen';
import "../../globals.css";
import SideBar from "@/components/Sidebar/SideBar";



export default function TeacherClassLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useUser();
    const router = useRouter();
    const [role, setRole] = useState<'teacher' | 'student' | null>(null);
    const [loadingRole, setLoadingRole] = useState(true);

    const checkUserRole = useCallback(async () => {
        if (!user) return;

        try {
            if (user.role === 'teacher') {
                setRole('teacher');
            } else {
                router.push('/');
            }
        } catch (error: any) {
            console.error("Error checking user role:", error.response?.data);
            router.push('/');
        } finally {
            setLoadingRole(false);
        }
    }, [user, router]);

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/login');
            } else {
                checkUserRole();
            }
        }
    }, [user, loading, router, checkUserRole]);

    if (loading || loadingRole || role !== 'teacher') {
        return <LoadingScreen />;
    }

    return (
        <section>
            <div className="flex flex-row">
                <SideBar role="teacher" />
                {children}
            </div>
        </section>
    );
}
