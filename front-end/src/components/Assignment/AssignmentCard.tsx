import Link from 'next/link';
import React from 'react';
import { FaBookmark } from 'react-icons/fa';

interface AssignmentCardProps {
    title: string;
    description: string;
    dueDate: string;
    status: string;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ title, description, dueDate, status }) => {
    return (
        <Link href="Assignment/id">
            <div className="bg-white shadow-2xl rounded-lg p-4 mb-4 flex flex-row gap-3">
                <div>
                    <FaBookmark className={` top-2 left-2 text-4xl ${status === 'To Do' ? 'text-bookmark1' : status === 'Submitted' ? 'text-bookmark2' : 'text-bookmark3'}`} />
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl norap xl:text-2xl font-bold text-salate-1000 ">{title}</h2>
                    </div>
                    <p className="text-salate-1000 font-bold mb-2">{description}</p>
                    <p className="text-salate-1000 font-bold text-sm">Due Date: {dueDate}</p>
                </div>
            </div>
        </Link>
    );
};

export default AssignmentCard;
