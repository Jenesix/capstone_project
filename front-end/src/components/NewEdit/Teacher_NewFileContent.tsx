"use client";
import { FiTrash2, FiUpload } from 'react-icons/fi';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Link from "next/link";

import { axioslib } from '@/lib/axioslib';
import { useParams } from 'next/navigation';
import { Resource, ResourceFolder } from '@/interface/interface';

const Teacher_NewFileContent: React.FC = () => {

    const { classID, folderID } = useParams();
    const [files, setFiles] = useState<File[]>([]);

    const [dbfiles, setDBFiles] = useState<Resource[]>([]);
    

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList) {
            setFiles(prevFiles => [...prevFiles, ...Array.from(fileList)]);
        }
    };

    const handleFileDelete = async (index: number) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });

        const endpoint = folderID
            ? `/api/user/uploadresource?classID=${classID}&folderID=${folderID}`
            : `/api/user/uploadresource?classID=${classID}`;

        try {
            await axioslib.post(endpoint, formData)
                .then((response) => {
                    console.log('File uploaded successfully:', response.data);
                })
                .then(() => {
                    window.location.href = `/Teacher/${classID}/File_Content`;
                });
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col mt-12 w-full px-4 sm:px-8 pb-6">
            <Link href={`/Teacher/${classID}/File_Content`}>
                <button className="text-salate-1000 font-bold py-2 px-4 rounded">
                    &lt;  Back
                </button>
            </Link>
            <div className='flex md:justify-center'>
                <div className='w-1/3 flex flex-col text-salate-1000'>
                    <form onSubmit={handleSubmit}>
                        <div className='w-60 md:w-72 lg:w-96 2xl:w-auto bg-content-light rounded-t-2xl text-center border-b border-salate-1000 pt-6 p-4 md:p-8 lg:p-12 text-sm md:text-xl lg:text-2xl font-extrabold'>
                            New File & Content
                        </div>
                        <div className='w-60 md:w-72 lg:w-96 2xl:w-auto bg-content-light rounded-b-2xl text-xs md:text-base lg:text-lg pt-4 p-4 md:p-8 lg:p-12'>

                            <p>Added File</p>
                            <ul className="mt-2 bg-white h-auto min-h-60 rounded-3xl border p-2">
                                {files.map((file, index) => (
                                    <li key={index} className="flex items-center justify-between text-sm text-bookmark1 p-2 rounded-lg mb-2">
                                        <span className='text-primary truncate ...'>{file.name}</span>
                                        <button type="button" onClick={() => handleFileDelete(index)} className="">
                                            <FiTrash2 />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <div className="relative w-full mt-4">
                                <input
                                    type="file"
                                    multiple
                                    className="hidden"
                                    id="fileInput"
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="fileInput" className="bg-white flex items-center justify-center text-black font-semibold py-2 px-4 border border-salate-1000 rounded-xl cursor-pointer">
                                    <FiUpload className="mr-2 text-salate-1000" />
                                    <span className="text-center text-salate-1000">Upload File</span>
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="text-xs md:text-base bg-bookmark2 text-white font-bold py-4 px-4 md:px-12 lg:px-14 rounded block mx-auto transition-all duration-300 transform hover:scale-105 mt-4"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Teacher_NewFileContent;
