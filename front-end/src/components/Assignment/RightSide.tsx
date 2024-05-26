import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { FiTrash2, FiUpload } from 'react-icons/fi';
import { AiOutlineFilePdf, AiOutlineFileImage, AiOutlineFile } from 'react-icons/ai';
import Image from 'next/legacy/image';

import { axioslib } from '@/lib/axioslib';
import { User, AssignmentTurnin } from '@/interface/interface';

interface Submission {
    name: string;
    studentNo: string;
    score: number;
    submissionFiles: { name: string; size: string }[];
    profileImage: string;
}

interface RightSideProps {
    submissions: Submission[];
}

const RightSide: React.FC<RightSideProps> = ({ submissions }) => {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const formatFileSize = (sizeInBytes: number): string => {
        if (sizeInBytes < 1024) {
            return `${sizeInBytes} B`;
        } else if (sizeInBytes < 1024 * 1024) {
            return `${(sizeInBytes / 1024).toFixed(2)} KB`;
        } else if (sizeInBytes < 1024 * 1024 * 1024) {
            return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
        } else {
            return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
        }
    };

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const files = Array.from(event.target.files);
        setUploadedFiles(prevFiles => [...prevFiles, ...files].slice(0, 10));
    };

    const handleDeleteFile = (index: number) => {
        setUploadedFiles(prevFiles => prevFiles.filter((_, idx) => idx !== index));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Submitting form...");
        console.log('Files to submit:', uploadedFiles);

        const updatedSubmissions = submissions.map(submission => ({
            ...submission,
            submissionFiles: [...submission.submissionFiles, ...uploadedFiles.map(file => ({
                name: file.name,
                size: formatFileSize(file.size)
            }))]
        }));

        console.log('Updated submissions:', updatedSubmissions);

        setUploadedFiles([]);
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

    const [user, setUser] = useState<User | undefined>();
    const fetchUser = async () => {
        try {
            const response = await axioslib.get('/api/user/getuserbyid');
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);


    return (
        <div className="flex flex-col pt-6 xl:pt-0 xl:mx-12">
            <h2 className="font-bold text-xl text-salate-1000 mb-2">Submission</h2>
            {submissions.map((submission, index) => (
                <div key={index} className="mb-2">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                <Image
                                    src={submission.profileImage}
                                    layout="responsive"
                                    objectFit="cover"
                                    alt="profile"
                                />
                            </div>
                            <div className="ml-4 font-bold text-salate-1000 flex flex-col">
                                <span>{submission.name}</span>
                                <span>{submission.studentNo}</span>
                            </div>
                        </div>
                        <div className="flex flex-col bg-salate-1000 rounded-full p-3 text-white">
                            <span className="font-bold ml-auto mr-5">{submission.score}</span>
                            <span className="font-bold">Points</span>
                        </div>
                    </div>

                    <h3 className="font-bold text-salate-1000 mt-2">Attachments</h3>
                    {submission.submissionFiles.map((file, fileIndex) => (
                        <div key={fileIndex} className="mb-2 flex items-center">
                            {getFileIcon(file.name)}
                            <a
                                href={`/path/to/submissions/${file.name}`}
                                className="text-blue-500 hover:underline truncate"
                                download
                                title={file.name}
                            >
                                {file.name}
                            </a>
                            <span className="text-salate-1000 ml-2">{file.size}</span>
                        </div>
                    ))}
                </div>
            ))}
            <div>
                {uploadedFiles.length > 0 && (
                    <div className="mb-4">
                        <ul className="list-disc list-inside ml-4">
                            {uploadedFiles.map((file, index) => (
                                <li key={index} className="text-primary text-sm lg:text-md flex items-center">
                                    {getFileIcon(file.name)}
                                    <span className="truncate" title={file.name}>
                                        {file.name} - {formatFileSize(file.size)}
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
            </div>
        </div>
    );
};

export default RightSide;
