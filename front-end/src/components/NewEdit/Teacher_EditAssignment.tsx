"use client";
import { FiTrash2, FiUpload } from 'react-icons/fi';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Link from "next/link";
import { useParams } from 'next/navigation';

import { axioslib } from '@/lib/axioslib';

const Teacher_EditAssignment: React.FC = () => {
    const { classID, assignID } = useParams();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [score, setScore] = useState<number | ''>('');
    const [files, setFiles] = useState<File[]>([]); 

    useEffect(() => {
        const fetchAssignment = async () => {
            try {
                const response = await axioslib.get(`/api/user/getassignbyid/${assignID}`);
                setTitle(response.data.assignment_name);
                setDescription(response.data.description_asm);
                const duedate = (response.data.due_date).split("T");
                setDate(duedate[0]);
                setTime(duedate[1].substring(0, 5));
                setScore(response.data.fullscore);
                setFiles(response.data.file_asm);
            } catch (error) {
                console.error("Error fetching assignment:", error);
            }
        }

        fetchAssignment();
    }, []);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    const handleDueTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTime(e.target.value);
    };

    const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setScore(value === '' ? '' : parseInt(value, 10));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList) {
            setFiles(prevFiles => [...prevFiles, ...Array.from(fileList)]);
        }
    };

    const handleFileDelete = async (index: number) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
        try {
            await axioslib.delete(`/api/user/deletefileassign/${assignID}`, { file_delete: files });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append('assignment_name', title);
            formData.append('description_asm', description);
            formData.append('date', date);
            formData.append('time', time);
            if (score !== '') {
                formData.append('fullscore', score.toString());
            }
            files.forEach(file => {
                formData.append('files', file);
            });

            await axioslib.put(`/api/user/editassign/${assignID}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(() => {
                window.location.href = `/Teacher/${classID}/Assignment`;
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col mt-12 w-full px-4 sm:px-8 pb-6">
            <Link href={`/Teacher/${classID}/Assignment/${assignID}`}>
                <button className="text-salate-1000 font-bold py-2 px-4 rounded">
                    &lt;  Back
                </button>
            </Link>
            <div className='flex md:justify-center'>
            <div className='w-full flex flex-col items-center text-salate-1000 '>
                    <form onSubmit={handleSubmit} className=''>
                        <div className='w-full bg-content-light rounded-t-2xl text-center border-b border-salate-1000 pt-6 p-4 md:p-8 lg:p-12 text-sm md:text-xl lg:text-2xl font-extrabold'>
                            Edit Assignment
                        </div>
                        <div className='w-full bg-content-light rounded-b-2xl text-xs md:text-base lg:text-lg pt-4 p-4 md:p-8 lg:p-12'>
                            <p>Assignment Title</p>
                            <input
                                value={title}
                                onChange={handleTitleChange}
                                placeholder="Your Title"
                                type='text'
                                className='mt-2 p-2 pl-4 bg-white border-salate-1000 rounded-xl w-full'
                            />

                            <p className='mt-4'>Assignment Description</p>
                            <textarea
                                value={description}
                                onChange={handleDescriptionChange}
                                placeholder="Your Description"
                                className='mt-2 p-2 pl-4 bg-white border-salate-1000 rounded-xl w-full min-h-60'
                            />

                            <div className='flex flex-row'>
                                <div className='flex flex-col mr-4'>
                                    <p className='mt-4'>Due Date</p>
                                    <input
                                        type="date"
                                        id="date"
                                        className="mt-2 p-2 md:pl-4 border leading-none text-xs md:text-sm rounded-xl block w-20 lg:w-full"
                                        value={date}
                                        onChange={handleDueDateChange}
                                        required
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <p className='mt-4'>Due Time</p>
                                    <input
                                        type="time"
                                        id="time"
                                        className="mt-2 p-2 md:pl-4 border leading-none text-xs md:text-sm rounded-xl block w-20 md:w-24 lg:w-24 2xl:w-full"
                                        value={time}
                                        onChange={handleDueTimeChange}
                                        required
                                    />
                                </div>
                                <div className='flex flex-col mt-4 pl-1 md:pl-2'>
                                    <p>Score</p>
                                    <input
                                        value={score}
                                        onChange={handleScoreChange}
                                        placeholder="Score"
                                        type='number'
                                        className='text-sm mt-2 p-2 pl-4 bg-white border rounded-xl w-full'
                                    />
                                </div>
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

export default Teacher_EditAssignment;
