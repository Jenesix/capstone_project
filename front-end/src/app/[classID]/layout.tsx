"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import LoadingScreen from '@/components/Loading/LoadingScreen';
import "@/app/globals.css";
import { axioslib } from '@/lib/axioslib';
import SideBar from "@/components/Sidebar/SideBar";

const ClassLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading } = useUser();
    const router = useRouter();
    const params = useParams();
    const classID = Array.isArray(params.classID) ? params.classID[0] : params.classID.toString();
    const [isClassMember, setIsClassMember] = useState(false);
    const [loadingMembership, setLoadingMembership] = useState(true);
    const [role, setRole] = useState<'teacher' | 'student' | null>(null);

    const checkClassMembership = useCallback(async () => {
        if (!user) return;

        try {
            const response = await axioslib.get(`/api/user/getuserclass/${classID}`);
            const classUsers = response.data;

            const isMember = classUsers.some((classUser: any) => classUser._id === user._id);
            if (isMember) {
                setIsClassMember(true);
                const userInClass = classUsers.find((classUser: any) => classUser._id === user._id);
                if (userInClass) {
                    setRole(userInClass.role);
                }
            } else {
                setIsClassMember(false);
                router.push('/');
            }
        } catch (error: any) {
            console.error("Error checking class membership:", error.response?.data);
            router.push('/not-authorized');
        } finally {
            setLoadingMembership(false);
        }
    }, [classID, user, router]);

    useEffect(() => {
        if (!loading) {
            if (!user || (user.role !== 'student' && user.role !== 'teacher')) {
                router.push('/login');
            } else {
                checkClassMembership();
            }
        }
    }, [user, loading, classID, router, checkClassMembership]);

    if (loading || loadingMembership || role === null || (role !== 'teacher' && role !== 'student')) {
        return <LoadingScreen />;
    }

    if (!isClassMember) {
        return null;
    }

    return (
        <section>
            <div className="flex flex-row">
                <SideBar role={role} classID={classID} />
                {children}
            </div>
        </section>
    );
};

export default ClassLayout;
