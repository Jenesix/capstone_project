"use client";
import React, { useEffect, useState } from 'react';
import { AiOutlineFilePdf } from 'react-icons/ai'; // PDF icon

import { axioslib } from '@/lib/axioslib';
import { Assignment as AssignmentInterface } from '@/interface/interface';

interface Assignment {
    title: string;
    dueDate: string;
    description: string;
    fullScore: number;
    pdfFile: string;
}

interface LeftSideProps {
    assignment: AssignmentInterface;
}

const LeftSide: React.FC<LeftSideProps> = ({ assignment }) => {
    const [fileSize, setFileSize] = useState<string>('');

    // const formatFileSize = (sizeInBytes: number): string => {
    //     if (sizeInBytes < 1024) {
    //         return `${sizeInBytes} B`;
    //     } else if (sizeInBytes < 1024 * 1024) {
    //         return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    //     } else if (sizeInBytes < 1024 * 1024 * 1024) {
    //         return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
    //     } else {
    //         return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    //     }
    // };

    // useEffect(() => {
    //     if (assignment.pdfFile) {
    //         fetch(assignment.pdfFile)
    //             .then(response => {
    //                 if (response.ok) {
    //                     return response.blob();
    //                 }
    //                 throw new Error('Network response was not ok');
    //             })
    //             .then(blob => {
    //                 setFileSize(formatFileSize(blob.size));
    //             })
    //             .catch(error => console.error('Error fetching the file:', error));
    //     }
    // }, [assignment.pdfFile]);

    const date = new Date(String(assignment?.due_date));
    const options = {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false
    };
    const formattedDate = date.toLocaleString("en-GB", options);

    console.log(assignment?.file_asm);
    

    return (
        <div className="flex flex-col xl:border-r-2 border-salate-100 xl:border-b-0 border-b-2 pb-6">
            <h2 className="font-bold text-xl text-salate-1000 mb-2">Due Date</h2>
            <p className="text-salate-1000 mb-4">{formattedDate}</p>
            <h2 className="font-bold text-xl text-salate-1000 mb-2">Description</h2>
            <p className="text-salate-1000 mb-4">{assignment?.description_asm}</p>
            <h2 className="font-bold text-xl text-salate-1000 mb-2">Attachments</h2>
            {/* {assignment.pdfFile && (
                <div className="mb-4 flex items-center">
                    <AiOutlineFilePdf className="text-red-500 mr-2" />
                    <a
                        href={assignment.pdfFile}
                        className="text-primary font-semibold hover:underline truncate"
                        download
                        title={assignment.pdfFile.split('/').pop()}
                    >
                        {assignment.pdfFile.split('/').pop()}
                    </a>
                    <span className="text-salate-1000 ml-2">{fileSize}</span>
                </div>
            )} */}
            {assignment?.file_asm.map((file, index) => (
                <div className="mb-4 flex items-center" key={index}>
                    <a
                        href={file}
                        className="text-primary font-semibold hover:underline truncate"
                        target='_blank'
                        // download
                    >
                        {/* <AiOutlineFilePdf className="text-red-500 mr-2" /> */}
                        {file.substring(file.lastIndexOf('/') + 1)}
                    </a>
                </div>
            ))}
            <h2 className="font-bold text-salate-1000 text-xl mb-2">Score</h2>
            <div className="flex items-center">
                <div className="w-12 h-12 flex flex-col mt-3 bg-salate-1000 p-9 text-white items-center justify-center bg-gray-300 rounded-full">
                    <span className="text-lg font-bold">{assignment?.fullscore}</span>
                    <span className="">Point</span>
                </div>
            </div>
        </div>
    );
};

export default LeftSide;
