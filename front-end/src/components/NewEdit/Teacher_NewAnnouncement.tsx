"use client";
import React, { useState } from 'react';
import Link from "next/link";

import { axioslib } from '@/lib/axioslib';
import { useUser } from '@/context/UserContext';
import { useParams } from 'next/navigation';
import { Announcement } from '@/interface/interface';

const Teacher_NewAnnouncement: React.FC = () => {
    const { classID } = useParams();

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [anm, setAnm] = useState({
        title_anm: '',
        description_anm: '',
    });

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setAnm({
            ...anm,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            axioslib
                .post(`/api/user/createannounce/${classID}`, anm)
                .then(() => {
                    console.log('create anm success');
                });
            window.location.href = `/Teacher/${classID}/Announcement`;
        } catch (error) {
            console.log(error);
        }
    }

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();

    //     // Process form data here
    //     const formData = new FormData();
    //     formData.append('title', title);
    //     formData.append('description', description);

    //     // You can now send formData to your server or API endpoint
    //     console.log('Form submitted:', { title, description });
    // };



    return (
        <div className="min-h-screen flex flex-col mt-12 w-full px-4 sm:px-8 pb-6">
            <Link href="/id/QnABoard">
                <button className="  text-salate-1000 font-bold py-2 px-4 rounded">
                    &lt;  Back
                </button>
            </Link>
            <div className='flex md:justify-center'>
                <div className='w-1/3 flex flex-col text-salate-1000'>
                    <form onSubmit={handleSubmit}>
                        <div className='w-60 md:w-72 lg:w-96 2xl:w-auto bg-content-light rounded-t-2xl text-center border-b border-salate-1000 pt-6 p-4 md:p-8 lg:p-12 text-sm md:text-xl lg:text-2xl font-extrabold'>
                            New Announcement
                        </div>
                        <div className='w-60 md:w-72 lg:w-96 2xl:w-auto bg-content-light rounded-b-2xl text-xs md:text-base lg:text-lg pt-4 p-4 md:p-8 lg:p-12'>
                            <p>Announcement Title</p>
                            <input
                                name='title_anm'
                                onChange={handleChange}
                                placeholder="Your Title"
                                type='text'
                                className='mt-2 p-2 pl-4 bg-white border-salate-1000 rounded-xl w-full'
                            />

                            <p className='mt-4'>Announcement Description</p>
                            <textarea
                                name='description_anm'
                                onChange={handleChange}
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

export default Teacher_NewAnnouncement;
