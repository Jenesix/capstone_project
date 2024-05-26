"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FiTrash2, FiUpload } from 'react-icons/fi';
import { AiOutlineFilePdf, AiOutlineFileImage, AiOutlineFile } from 'react-icons/ai';
import Image from 'next/legacy/image';
import { AssignmentTurnin } from '@/interface/interface';
import profile from '../../../public/profile.svg';
import { useUser } from '@/context/UserContext';
import { axioslib } from '@/lib/axioslib';

interface RightSideProps {
    submissions: AssignmentTurnin[];
    fetchAssignmentDetails: () => void;
}

const RightSide: React.FC<RightSideProps> = ({ submissions, fetchAssignmentDetails }) => {
    const { user } = useUser();
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const files = Array.from(event.target.files);
        setUploadedFiles(prevFiles => [...prevFiles, ...files].slice(0, 10));
    };

    const handleDeleteFile = (index: number) => {
        setUploadedFiles(prevFiles => prevFiles.filter((_, idx) => idx !== index));
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Submitting form...");
        console.log('Files to submit:', uploadedFiles);


    };

    const getFileIcon = (fileName: string) => {
        const fileExtension = fileName.split('.').pop()?.toLowerCase();
        switch (fileExtension) {
            case 'pdf':
                return <AiOutlineFilePdf className="text-lg mr-2" />;
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                return <AiOutlineFileImage className="text-lg mr-2" />;
            default:
                return <AiOutlineFile className="text-lg mr-2" />;
        }
    };

    return (
        <div className="flex flex-col pt-6 xl:pt-0 xl:mx-12 min-w-96 max-w-96 ">
            <h2 className="font-bold text-xl text-salate-1000 mb-2">Submission</h2>
            <div className="mb-2">
                <div className="flex justify-between items-start lg:items-center flex-col lg:flex-row ">
                    <div className="flex items-center">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden">
                            <Image
                                src={profile}
                                layout="responsive"
                                objectFit="cover"
                                alt="profile"
                            />
                        </div>
                        <div className="ml-4 font-bold text-salate-1000 flex flex-col">
                            <span>{user?.firstname} {user?.lastname}</span>
                            <span>{user?.email}</span>
                        </div>
                    </div>
                    <div className="flex flex-col bg-salate-1000 rounded-full p-3 text-white xl:ml-12 mr-6 lg:mt-0 mt-3">
                        <span className="font-bold text-center">{submissions.length > 0 ? submissions[0].score : 0}</span>
                        <span className="font-bold">Points</span>
                    </div>
                </div>
            </div>
            <h3 className="font-bold text-salate-1000 mt-2 mb-2">Attachments</h3>
            {submissions.length > 0 && (
                <div className="mb-2">
                    {submissions.map((submission, index) => (
                        <div key={index}>
                            {submission.file_turnin && submission.file_turnin.map((file, fileIndex) => (
                                <div key={fileIndex} className="mb-2 flex items-center">
                                    {getFileIcon(file)}
                                    <a
                                        href={file}
                                        className="text-blue-500 hover:underline truncate"
                                        target='_blank'
                                        rel="noopener noreferrer"
                                        title={file}
                                    >
                                        {file.substring(file.lastIndexOf('/') + 1)}
                                    </a>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
            <div>
                {uploadedFiles.length > 0 && (
                    <div className="mb-4">
                        <ul className="list-disc list-inside ml-4">
                            {uploadedFiles.map((file, index) => (
                                <li key={index} className="text-primary text-sm lg:text-md flex items-center">
                                    {getFileIcon(file.name)}
                                    <span className="truncate" title={file.name}>
                                        {file.name}
                                    </span>
                                    <button
                                        onClick={() => handleDeleteFile(index)}
                                        className="ml-2 text-bookmark1">
                                        <FiTrash2 />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {!isEditing && submissions.length > 0 ? (
                    <button
                        onClick={handleEdit}
                        className="bg-bookmark2 text-white font-bold py-2 px-8 rounded block mx-auto transition-all duration-300 transform hover:scale-105 mt-4"
                    >
                        Edit
                    </button>
                ) : (
                    <form onSubmit={handleSubmit} className="mb-4 relative">
                        <input
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                            className="absolute inset-0 w-full p-2 h-10 opacity-0 cursor-pointer border z-10"
                        />
                        <label className="flex items-center justify-center text-black font-bold py-2 px-4 border border-salate-1000 rounded cursor-pointer">
                            <FiUpload className="mr-2" />
                            <span className="text-center">Upload File</span>
                        </label>

                        <button
                            type="submit"
                            className="bg-bookmark2 text-white font-bold py-2 px-8 rounded block mx-auto transition-all duration-300 transform hover:scale-105 mt-4"
                        >
                            Submit
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default RightSide;
