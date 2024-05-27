"use client";
import { useParams } from 'next/navigation';
import { FaTrashAlt } from "react-icons/fa";
import React, { useState } from 'react';
import Image from 'next/legacy/image';
import Link from "next/link";


const Teacher_NewBoard: React.FC = () => {
    const { classID } = useParams();

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImage(null);
        setPreview(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Process form data here
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }

        // You can now send formData to your server or API endpoint
        console.log('Form submitted:', { title, description, image });
    };



    return (
        <div className="min-h-screen flex flex-col mt-12 w-full px-4 sm:px-8 pb-6">
            <Link href={`/Teacher/${classID}/QnABoard`}>
                <button className="  text-salate-1000 font-bold py-2 px-4 rounded">
                    &lt;  Back
                </button>
            </Link>
            <div className='flex md:justify-center'>
                    <div className='w-1/3 flex flex-col text-salate-1000'>
                        <form onSubmit={handleSubmit}>
                        <div className='w-60 md:w-72 lg:w-96 2xl:w-auto bg-content-light rounded-t-2xl text-center border-b border-salate-1000 pt-6 p-4 md:p-8 lg:p-12 text-sm md:text-xl lg:text-2xl font-extrabold'>
                                New Q&A Board
                            </div>
                            <div className='w-60 md:w-72 lg:w-96 2xl:w-auto bg-content-light rounded-b-2xl text-xs md:text-base lg:text-lg pt-4 p-4 md:p-8 lg:p-12'>
                                <p>Board Title</p>
                                <input
                                    value={title}
                                    onChange={handleTitleChange}
                                    placeholder="Your Title"
                                    type='text'
                                    className='mt-2 p-2 pl-4 bg-white border-salate-1000 rounded-xl w-full'
                                />
                                
                                <p className='mt-4'>Board Description</p>
                                <textarea
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    placeholder="Your Description"
                                    className='mt-2 p-2 pl-4 bg-white border-salate-1000 rounded-xl w-full min-h-60'
                                />
                                
                                <p className='mt-4'>Image (Optional)</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className='mt-2 p-2 bg-white border-salate-1000 rounded-xl w-full'
                                />
                                {preview && (
                                    <div className='mt-4'>
                                        <Image
                                            src={preview}
                                            alt="Preview"
                                            width={500}
                                            height={300}
                                            className='rounded-xl object-contain bg-white'
                                        />
                                        <button
                                            onClick={removeImage}
                                            type="button"
                                            className='mt-2 bg-white text-bookmark1 px-4 py-2 rounded-lg flex items-center border'
                                        >
                                            <FaTrashAlt className="mr-2" />
                                            Remove Image
                                        </button>
                                    </div>
                                )}
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

export default Teacher_NewBoard;
