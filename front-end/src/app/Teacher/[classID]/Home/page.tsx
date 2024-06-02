"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import LoadingScreen from '@/components/Loading/LoadingScreen';
import Calendar from '@/components/CalendarHome/Calendar';
import AgendaView from '@/components/CalendarHome/AgendaView';

import "@/app/globals.css";
import { Assignment as ServerAssignment } from '@/interface/interface';
import { axioslib } from '@/lib/axioslib';

interface Assignment {
    _id: string;
    name: string;
    dueDate: string;
    dueTime: string;
}

const TeacherMain: React.FC = () => {
    const { user, loading } = useUser();
    const router = useRouter();
    const params = useParams();
    const { classID } = params;
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [loadingAssignments, setLoadingAssignments] = useState(true);

    const fetchAssignments = useCallback(async () => {
        try {
            const response = await axioslib.get(`/api/user/getassign/${classID}`);
            const assignmentsData = response.data.map((assignment: ServerAssignment) => ({
                _id: assignment._id,
                name: assignment.assignment_name,
                dueDate: assignment.due_date.toString().split('T')[0], // Convert to string before splitting
                dueTime: assignment.due_date.toString().split('T')[1].slice(0, 5), // Convert to string before splitting
            }));
            setAssignments(assignmentsData);
        } catch (error: any) {
            console.error("Error fetching assignments:", error.response?.data);
        } finally {
            setLoadingAssignments(false);
        }
    }, [classID]);

    useEffect(() => {
        if (!loading && (!user || user.role !== 'teacher')) {
            router.push('/login');
        } else if (user && user.role === 'teacher') {
            fetchAssignments();
        }
    }, [user, loading, classID, router, fetchAssignments]);

    if (loading || loadingAssignments) {
        return <LoadingScreen />;
    }


    return (
        <div className="min-h-screen w-full mt-6 pb-6">
            <div className="hidden lg:block">
                <Calendar assignments={assignments} />
            </div>
            <div className="block lg:hidden">
                <AgendaView assignments={assignments} />
            </div>
        </div>
    );
};

export default TeacherMain;
