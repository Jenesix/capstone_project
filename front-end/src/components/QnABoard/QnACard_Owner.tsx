import React, { useState } from 'react';
import Image from 'next/legacy/image';
import { SlOptionsVertical } from "react-icons/sl";
import Link from 'next/link';
import { StaticImageData } from 'next/image';
import profile from '../../../public/profile.svg';

import { axioslib } from '@/lib/axioslib';
import { useUser } from '@/context/UserContext';

interface QnACardProps {
    postID: string,
    post_title: string,
    editLink: string,
    post_desc: string,
    postimage: string;
    time: string,
    user_id: string,
    profileImage: string | StaticImageData;
    firstname: string,
    lastname: string,
}

const QnACard_Owner: React.FC<QnACardProps> = ({ postID, post_title, editLink, post_desc, postimage, time, user_id, profileImage, firstname, lastname }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const { user } = useUser();

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleDeletePost = async () => {
        try {
            await axioslib.delete(`/api/user/deletepost/${postID}`)
                .then(() => {
                    window.location.reload();
                });
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    }

    return (
        <div className={`bg-content-light shadow-2xl rounded-4xl p-4 mb-8 min-h-60 text-salate-1000 overflow-hidden px-6`}>
            <div className="flex flex-row mb-4">
                <h1 className="font-bold text-xl text-primary truncate pr-4 flex-grow mt-1">{post_title}</h1>
                <div className="relative">
                    {user?.user_id === user_id || user?.role === "teacher" ? (
                        <SlOptionsVertical className="ml-auto cursor-pointer" onClick={toggleDropdown} />
                    ) : null}
                    {dropdownVisible && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                            {user?.user_id === user_id ? (
                                <Link href={editLink}>
                                    <p className="w-full text-left px-4 py-2 hover:bg-content-light">
                                        Edit
                                    </p>
                                </Link>
                            ) : null}
                            <button
                                className="w-full text-left px-4 py-2 hover:bg-content-light"
                                onClick={handleDeletePost}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <Link href={`QnABoard/${postID}`}>
                <div>
                    <div className={`mb-4 min-h-8 font-semibold truncate whitespace-normal`}>{post_desc}</div>
                    <div className="flex flex-col md:flex-row min-h-20">
                        <div className="flex items-center mb-4 md:mb-0">
                            <div className={`size-16 rounded-full overflow-hidden`}>
                                <Image
                                    src={profileImage}
                                    objectFit="fill"
                                    alt="profile"
                                />
                            </div>
                            <div className={`text-left ml-2 font-bold text-salate-1000 flex flex-col whitespace-normal flex-grow overflow-hidden`}>
                                <span className="text-base">{firstname} {lastname}</span>
                                <span className="text-sm">{user_id}</span>
                            </div>
                        </div>

                        <div className="md:ml-auto flex flex-col items-end">
                            {postimage && (
                                <div className={`relative mb-2 h-32 w-52`}>
                                    <Image
                                        src={postimage}
                                        layout="fill"
                                        objectFit="cover"
                                        alt="post image"
                                    />
                                </div>
                            )}
                            <div className="font-base">{time}</div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default QnACard_Owner;
