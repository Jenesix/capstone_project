import React, { useState } from 'react';
import Image from 'next/legacy/image';
import { SlOptionsVertical } from "react-icons/sl";
import Link from 'next/link';
import { StaticImageData } from 'next/image';

interface QnACardProps {
    boardID: string,
    board_title: string,
    editLink: string,
    board_desc: string,
    postimage: string | StaticImageData;
    time: string,
    user_id: string,
    profileImage: string | StaticImageData;
    firstname: string,
    lastname: string,
}

const QnACard: React.FC<QnACardProps> = ({
    boardID, board_title, editLink, board_desc, postimage, time, user_id, profileImage, firstname, lastname}) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <div className={`bg-content-light shadow-2xl rounded-lg p-4 mb-8 min-h-60 text-salate-1000 overflow-hidden`}>
            <div className="flex flex-row mb-4">
                <h1 className="font-bold text-xl text-primary truncate pr-4 flex-grow">{board_title}</h1>
                <div className="relative">


                    {/*Option Button*/}
                    <SlOptionsVertical className="ml-auto cursor-pointer" onClick={toggleDropdown} />
                    {dropdownVisible && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                            <Link href={editLink}>
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
                    <div className={`mb-4 min-h-8 font-semibold truncate whitespace-normal`}>{board_desc}</div>

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
                            <div className={`relative mb-2 h-32 w-52`}>
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
