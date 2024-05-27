"use client";
import { FiTrash2, FiUpload } from 'react-icons/fi';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Link from "next/link";

const Teacher_EditAttendance: React.FC = () => {
    const [dueDate, setDueDate] = useState<string>('');
    const [dueTime, setDueTime] = useState<string>('');

    const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDueDate(e.target.value);
    };

    const handleDueTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDueTime(e.target.value);
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('dueDate', dueDate);
        formData.append('dueTime', dueTime);

        // console.log('Form submitted:', {
        //     dueDate,
        //     dueTime,
        // });
    };

    return (
        <div className="min-h-screen flex flex-col mt-12 w-full px-4 sm:px-8 pb-6">
            <Link href="/id/QnABoard">
                <button className="text-salate-1000 font-bold py-2 px-4 rounded">
                    &lt;  Back
                </button>
            </Link>
            <div className='flex md:justify-center'>
                <div className='w-1/3 flex flex-col text-salate-1000'>
                    <form onSubmit={handleSubmit}>
                        <div className='w-60 md:w-72 lg:w-96 2xl:w-auto bg-content-light rounded-t-2xl text-center border-b border-salate-1000 pt-6 p-4 md:p-8 lg:p-12 text-sm md:text-xl lg:text-2xl font-extrabold'>
                            Edit Attendance
                        </div>
                        <div className='w-60 md:w-72 lg:w-96 2xl:w-auto bg-content-light rounded-b-2xl text-xs md:text-base lg:text-lg pt-4 p-4 md:p-8 lg:p-12'>

                            <div className='flex flex-row  '>
                                <div className='flex flex-col mr-4 md:mr-4'>    
                                    <p className=''>Attendance Date</p>
                                    <input 
                                        type="date" 
                                        id="date" 
                                        className="mt-2 p-2 md:pl-4 border leading-none text-xs md:text-base rounded-xl block w-24 md:w-32 lg:w-full" 
                                        value={dueDate} 
                                        onChange={handleDueDateChange} 
                                        required 
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <p className=''>Time Start</p>
                                    <input 
                                        type="time" 
                                        id="time" 
                                        className="mt-2 p-2 md:pl-6 border leading-none text-xs md:text-base rounded-xl block w-24 md:w-28 lg:w-full" 
                                        value={dueTime} 
                                        onChange={handleDueTimeChange} 
                                        required 
                                    />
                                </div> 
                            </div>
                            <p className='mt-8 text-xs md:text-sm text-primary'>After 15 minutes from the Time Start, the status will be <span className='font-black '>Late</span></p>
                            <p className='mt-4 mb-8 text-xs md:text-sm text-primary'>And after more than 30 minutes, the status will be <span className='font-black text-bookmark1'>Absent</span></p>
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

export default Teacher_EditAttendance;
