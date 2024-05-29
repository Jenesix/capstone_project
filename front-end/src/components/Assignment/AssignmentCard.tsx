import Link from 'next/link';
import React from 'react';
import { FaBookmark } from 'react-icons/fa';

interface AssignmentCardProps {
    classID: string;
    assignID: string;
    title: string;
    description: string;
    dueDate: string;
    status: string;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ classID, assignID, title, description, dueDate, status }) => {
    return (
        <Link href={`/${classID}/Assignment/${assignID}`}>
            <div className="bg-white shadow-lg rounded-4xl p-4 mb-4 flex flex-row gap-3">
                <div>
                    <FaBookmark className={`top-2 left-2 text-4xl ${status === 'To Do' ? 'text-bookmark1' : status === 'Submitted' ? 'text-bookmark2' : 'text-bookmark3'}`} />
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
