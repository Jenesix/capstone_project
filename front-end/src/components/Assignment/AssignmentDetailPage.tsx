"use client";
import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import { axioslib } from '@/lib/axioslib';
import { useParams } from 'next/navigation';
import { Assignment, AssignmentTurnin } from '@/interface/interface';
import { useUser } from '@/context/UserContext';

const AssignmentDetailPage: React.FC = () => {
    const { assignID } = useParams();
    const { user, loading } = useUser();
    const [assignment, setAssignment] = useState<Assignment | undefined>(undefined);
    const [submissions, setSubmissions] = useState<AssignmentTurnin[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAssignmentDetails = useCallback(async () => {
        if (!user?._id) {
            console.error('User ID is not available');
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const assignmentResponse = await axioslib.get(`/api/user/getassignbyid/${assignID}`);
            setAssignment(assignmentResponse.data);

            const submissionsResponse = await axioslib.get(`/api/user/getturnin/${assignID}`);
            console.log("Full submissions response:", submissionsResponse.data);

            const userSubmissions = submissionsResponse.data.filter(
                (submission: AssignmentTurnin) => submission.UserID._id === user._id
            );

            setSubmissions(userSubmissions);
        } catch (error) {
            console.error('Error fetching assignment details:', error);
            setError('Error fetching assignment details');
        } finally {
            setIsLoading(false);
        }
    }, [assignID, user]);

    useEffect(() => {
        if (!loading && user?._id) {
            fetchAssignmentDetails();
        }
    }, [fetchAssignmentDetails, loading, user]);

    if (isLoading || loading) {

        return <div className="text-center mt-12">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-12 text-red-500">{error}</div>;
    }

    return (
        <div className="flex flex-col mt-12 w-full px-4 sm:px-8 2xl 2xl:ml-32">
            <div className="flex items-center mb-8">
                <Link href="/id/Assignment">
                    <button className="text-salate-1000 font-bold py-2 px-4 rounded">
                        &lt;  Back
                    </button>
                </Link>
                <h1 className="text-primary text-center font-bold text-xl sm:text-2xl lg:text-3xl flex-grow mr-20 mb-2">
                    Assignment
                </h1>
            </div>
            <div className="mx-12">
                <div className="flex flex-row items-center mb-4">
                    <span className="font-bold text-2xl text-primary">{assignment?.assignment_name}</span>
                </div>
                <div className="flex-grow border-b border-2 border-salate-100 mb-4"></div>
            </div>
            <div className="min-h-screen mx-12 grid grid-cols-1 lg:grid-cols-2 gap-8 pb-6">
                {assignment && <LeftSide assignment={assignment} />}
                <RightSide submissions={submissions} fetchAssignmentDetails={fetchAssignmentDetails} />
            </div>
        </div>
    );
};

export default AssignmentDetailPage;
