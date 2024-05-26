"use client";


import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { axioslib } from '@/lib/axioslib';
import { Assignment } from '@/interface/interface';

const AssignmentDetail: React.FC = () => {
    const { classID, assignID } = useParams();
    const [assignment, setAssignment] = useState<Assignment | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssignmentDetails = async () => {
            try {
                const response = await axioslib.get(`/api/user/getassignbyid/${assignID}`);
                setAssignment(response.data);
            } catch (error) {
                console.error('Error fetching assignment details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (assignID) {
            fetchAssignmentDetails();
        }
    }, [assignID]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!assignment) {
        return <p>No assignments found.</p>;
    }

    return (
        <div>
            <h1>{assignment.assignment_name}</h1>
            <p>{assignment.description_asm}</p>
            <p>Due Date: {new Date(assignment.due_date).toLocaleDateString()}</p>
        </div>
    );
};

export default AssignmentDetail;
