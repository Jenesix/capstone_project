"use client";
import { FiTrash2, FiUpload } from 'react-icons/fi';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Link from "next/link";
import { useParams } from 'next/navigation';

const Teacher_NewAssignment: React.FC = () => {
    const { classID } = useParams();
    
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>('');
    const [dueTime, setDueTime] = useState<string>('');
    const [score, setScore] = useState<number | ''>('');
    const [files, setFiles] = useState<File[]>([]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDueDate(e.target.value);
    };

    const handleDueTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDueTime(e.target.value);
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

    const handleFileDelete = (index: number) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('dueDate', dueDate);
        formData.append('dueTime', dueTime);
        if (score !== '') {
            formData.append('score', score.toString());
        }
        files.forEach(file => {
            formData.append('files', file);
        });

        console.log('Form submitted:', {
            title,
            description,
            dueDate,
            dueTime,
            score,
            files,
        });
    };

    return (
        <div className="min-h-screen flex flex-col mt-12 w-full px-4 sm:px-8 pb-6">
            <Link href={`/Teacher/${classID}/Assignment`}>
                <button className="text-salate-1000 font-bold py-2 px-4 rounded">
                    &lt;  Back
                </button>
            </Link>
            <div className='flex md:justify-center'>
                <div className='w-1/3 flex flex-col text-salate-1000'>
                    <form onSubmit={handleSubmit}>
                        <div className='w-60 md:w-72 lg:w-96 2xl:w-auto bg-content-light rounded-t-2xl text-center border-b border-salate-1000 pt-6 p-4 md:p-8 lg:p-12 text-sm md:text-xl lg:text-2xl font-extrabold'>
                            New Assignment
                        </div>
                        <div className='w-60 md:w-72 lg:w-96 2xl:w-auto bg-content-light rounded-b-2xl text-xs md:text-base lg:text-lg pt-4 p-4 md:p-8 lg:p-12'>
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
                                        value={dueDate} 
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
                                        value={dueTime} 
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

                            <p className='mt-4'>Attachments (Optional)</p>
                            <div className="relative w-full">
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
                            <ul className="mt-4">
                                {files.map((file, index) => (
                                    <li key={index} className="flex items-center justify-between text-sm text-bookmark1 p-2 rounded-lg mb-2">
                                        <span className='text-primary truncate ...'>{file.name}</span>
                                        <button type="button" onClick={() => handleFileDelete(index)} className="">
                                            <FiTrash2 />
                                        </button>
                                    </li>
                                ))}
                            </ul>

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

export default Teacher_NewAssignment;
