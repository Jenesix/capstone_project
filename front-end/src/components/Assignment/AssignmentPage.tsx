"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Assignment, AssignmentTurnin } from '@/interface/interface';
import AssignBanner from './AssignBanner';
import AssignmentCard from './AssignmentCard';
import { axioslib } from '@/lib/axioslib';
import { useUser } from '@/context/UserContext';
import LoadingScreen from '../Loading/LoadingScreen';

const AssignmentPage: React.FC = () => {
    const { classID } = useParams();
    const { user, loading: userLoading } = useUser();
    const [assignments, setAssignments] = useState<(Assignment & { status: string })[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                if (!classID) {
                    throw new Error('Class ID is not available');
                }

                const response = await axioslib.get(`/api/user/getassign/${classID}`);
                const assignments: Assignment[] = response.data;
                const userId = user?._id;

                if (!userId) {
                    throw new Error('User ID is not available');
                }

                const updatedAssignments = await Promise.all(assignments.map(async assignment => {
                    let status = 'To Do';
                    const turninResponses = await axioslib.get(`/api/user/getturnin/${assignment._id}`);
                    const turnins: AssignmentTurnin[] = turninResponses.data;
                    const userTurnin = turnins.find(turnin => turnin.UserID._id === userId);

                    if (userTurnin) {
                        status = userTurnin.status_turnin === 'On time' ? 'Submitted' : 'Late Submitted';
                    }

                    return {
                        ...assignment,
                        status
                    };
                }));
                setAssignments(updatedAssignments);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            } finally {
                setLoading(false);
            }
        };

        if (classID && user && !userLoading) {
            fetchAssignments();
        }
    }, [classID, user, userLoading]);

    if (loading || userLoading) {
        return <LoadingScreen />;
    }

    const toDoAssignments = assignments.filter(assignment => assignment.status === "To Do");
    const submittedAssignments = assignments.filter(assignment => assignment.status === "Submitted" || assignment.status === "Late Submitted");

    return (
        <div className="flex flex-col mt-12 w-full px-4 sm:px-8 min-h-screen pb-6">
            <h1 className="text-primary text-center font-bold text-xl sm:text-2xl lg:text-3xl">Assignment</h1>
            <div className="flex flex-col md:flex-row mx-12">
                <div className="mb-4 md:mb-0 md:mr-4">
                    <AssignBanner color="text-bookmark1" text="To Do" />
                </div>
                <div className="mb-4 md:mb-0 md:mr-4">
                    <AssignBanner color="text-bookmark2" text="Submitted" />
                </div>
                <div className="mb-4 md:mb-0 md:mr-4">
                    <AssignBanner color="text-bookmark3" text="Late Submitted" />
                </div>
            </div>
            <div className="mx-12 mt-5">
                <div className="flex flex-row items-center mb-4">
                    <span className="font-bold text-salate-100">To Do</span>
                    <div className="flex-grow border-t border-2 border-salate-100 ml-2"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {toDoAssignments.map(assignment => (
                        <AssignmentCard
                            key={assignment._id}
                            classID={classID as string}
                            assignID={assignment._id}
                            title={assignment.assignment_name}
                            description={assignment.description_asm}
                            dueDate={new Date(assignment.due_date).toLocaleDateString()}
                            status={assignment.status}
                        />
                    ))}
                </div>
            </div>
            <div className="mx-12 mt-5">
                <div className="flex flex-row items-center mb-4">
                    <span className="font-bold text-salate-100">Submitted</span>
                    <div className="flex-grow border-t border-2 border-salate-100 ml-2"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {submittedAssignments.map(assignment => (
                        <AssignmentCard
                            key={assignment._id}
                            classID={classID as string}
                            assignID={assignment._id}
                            title={assignment.assignment_name}
                            description={assignment.description_asm}
                            dueDate={new Date(assignment.due_date).toLocaleDateString()}
                            status={assignment.status}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default AssignmentPage;
