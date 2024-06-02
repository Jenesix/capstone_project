"use client";
import React from 'react';
import { useParams } from 'next/navigation'
import { Assignment as AssignmentInterface } from '@/interface/interface';

interface Teacher_LeftSideProps {
    assignment: AssignmentInterface;
}

const Teacher_LeftSide: React.FC<Teacher_LeftSideProps> = ({ assignment }) => {
    const { classID, assignID } = useParams()

    const date = new Date(String(assignment.due_date));
    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false
    };
    const formattedDate = date.toLocaleString("en-GB", options);

    return (
        <div className="flex flex-col lg:border-r-2 border-salate-100 xl:border-b-0 border-b-2 pb-6">
            <h2 className="font-bold text-xl text-salate-1000 mb-2">Due Date</h2>
            <p className="text-salate-1000 mb-4">{formattedDate}</p>
            <h2 className="font-bold text-xl text-salate-1000 mb-2">Description</h2>
            <p className="text-salate-1000 mb-4">{assignment.description_asm}</p>
            <h2 className="font-bold text-xl text-salate-1000 mb-2">Attachments</h2>
            {assignment.file_asm.map((file, index) => (
                <div className="mb-4 flex items-center" key={index}>
                    <a
                        href={file}
                        className="text-primary font-semibold hover:underline truncate"
                        target='_blank'
                        rel="noopener noreferrer"
                    >
                        {file.substring(file.lastIndexOf('/') + 1)}
                    </a>
                </div>
            ))}
            <h2 className="font-bold text-salate-1000 text-xl mb-2">Score</h2>
            <div className="flex items-center">
                <div className="w-12 h-12 flex flex-col mt-3 bg-salate-1000 p-9 text-white items-center justify-center bg-gray-300 rounded-full">
                    <span className="text-lg font-bold">{assignment.fullscore}</span>
                    <span className="">Point</span>
                </div>
            </div>
        </div>
    );
};

export default Teacher_LeftSide;
