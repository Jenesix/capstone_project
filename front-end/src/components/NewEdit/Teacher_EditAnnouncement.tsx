"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { useParams } from 'next/navigation';
import { axioslib } from '../../lib/axioslib';
import { useUser } from '@/context/UserContext';


const Teacher_EditAnnouncement: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const { classID } = useParams();
    const { user } = useUser();

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!classID || !user) {
            console.error("Class ID or User ID is missing");
            return;
        }

        try {
            const response = await axioslib.post(`/api/user/createannounce/${classID}`, {
                title_anm: title,
                desc_anm: description,
                time_anm: new Date().toISOString(),
                UserID: user._id, // Include user ID from the context
            });

            console.log('Form submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col mt-12 w-full px-4 sm:px-8 pb-6">
            <Link href={`/Teacher/${classID}/Announcement`}>
                <button className="text-salate-1000 font-bold py-2 px-4 rounded">
                    &lt;  Back
                </button>
            </Link>
            <div className='flex md:justify-center'>
                <div className='w-1/3 flex flex-col text-salate-1000'>
                    <form onSubmit={handleSubmit}>
                        <div className='w-60 md:w-72 lg:w-96 2xl:w-auto bg-content-light rounded-t-2xl text-center border-b border-salate-1000 pt-6 p-4 md:p-8 lg:p-12 text-sm md:text-xl lg:text-2xl font-extrabold'>
                            Edit Announcement
                        </div>
                        <div className='w-60 md:w-72 lg:w-96 2xl:w-auto bg-content-light rounded-b-2xl text-xs md:text-base lg:text-lg pt-4 p-4 md:p-8 lg:p-12'>
                            <p>Announcement Title</p>
                            <input
                                value={title}
                                onChange={handleTitleChange}
                                placeholder="Your Title"
                                type='text'
                                className='mt-2 p-2 pl-4 bg-white border-salate-1000 rounded-xl w-full'
                            />

                            <p className='mt-4'>Announcement Description</p>
                            <textarea
                                value={description}
                                onChange={handleDescriptionChange}
                                placeholder="Your Description"
                                className='mt-2 p-2 pl-4 bg-white border-salate-1000 rounded-xl w-full min-h-60'
                            />
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

export default Teacher_EditAnnouncement;
