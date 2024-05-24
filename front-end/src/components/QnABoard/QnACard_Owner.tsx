import React, { useState } from 'react';
import Image from 'next/legacy/image';
import { SlOptionsVertical } from "react-icons/sl";
import Link from 'next/link';
import { StaticImageData } from 'next/image';

interface QnACardProps {
    boardID: string,
    board_title: string,
    board_desc: string,
    postimage: string | StaticImageData;
    time: string,
    size_card: string,
    height_detail: string,
    size_image: string,
    user_id: string,
    profileImage: string | StaticImageData;
    firstname: string,
    lastname: string,
    size_profile: string,
    size_divtext: string,
    size_nameuser: string,
    size_iduser: string,
}

const QnACard: React.FC<QnACardProps> = ({
    boardID, board_title, board_desc, postimage, time, size_card, height_detail, size_image, user_id, profileImage, firstname, lastname, size_profile, size_divtext, size_nameuser, size_iduser
}) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <div className={`bg-content-light shadow-2xl rounded-lg p-4 mb-8 ${size_card} text-salate-1000 overflow-hidden`}>
            <div className="flex flex-row mb-4">
                <h1 className="font-bold text-xl text-primary truncate pr-4 flex-grow">{board_title}</h1>
                <div className="relative">
                    <SlOptionsVertical className="ml-auto cursor-pointer" onClick={toggleDropdown} />
                    {dropdownVisible && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                            <Link href={`/classID/QnABoard/qnaboardID/Edit`}>
                                <p className="w-full text-left px-4 py-2 hover:bg-content-light">
                                    Edit
                                </p>
                            </Link>
                            <button
                                className="w-full text-left px-4 py-2 hover:bg-content-light"
                                onClick={() => console.log('Delete clicked')}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <Link href={`QnABoard/${boardID}`}>
                <div>
                    <div className={`mb-4 ${height_detail} font-semibold truncate whitespace-normal`}>{board_desc}</div>

                    <div className="flex flex-col md:flex-row min-h-20">
                        <div className="flex items-center mb-4 md:mb-0">
                            <div className={`${size_profile} rounded-full overflow-hidden`}>
                                <Image
                                    src={profileImage}
                                    objectFit="fill"
                                    alt="profile"
                                />
                            </div>
                            <div className={`text-left ml-2 font-bold text-salate-1000 flex flex-col whitespace-normal flex-grow overflow-hidden ${size_divtext}`}>
                                <span className={size_nameuser}>{firstname} {lastname}</span>
                                <span className={size_iduser}>{user_id}</span>
                            </div>
                        </div>

                        <div className="md:ml-auto flex flex-col items-end">
                            <div className={`relative mb-2 ${size_image}`}>
                                <Image
                                    src={postimage}
                                    layout="fill"
                                    objectFit="cover"
                                    alt="postimage"
                                />
                            </div>
                            <div className="font-base">{time}</div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default QnACard;
