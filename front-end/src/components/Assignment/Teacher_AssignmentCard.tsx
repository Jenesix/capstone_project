import React, { useState } from 'react';
import Link from 'next/link';
import { FaBookmark } from 'react-icons/fa';
import { SlOptionsVertical } from "react-icons/sl";


interface Teacher_AssignmentCardProps {
    classID: string;
    assignID: string;
    title: string;
    description: string;
    dueDate: string;
    status: string;
}

const Teacher_AssignmentCard: React.FC<Teacher_AssignmentCardProps> = ({ classID, assignID, title, description, dueDate, status }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <div className='bg-white shadow-2xl rounded-lg '>
            <div className="relative text-salate-1000 mt-4 mb-2 mr-4">
                <SlOptionsVertical className="ml-auto cursor-pointer" onClick={toggleDropdown} />
                {dropdownVisible && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                        <Link href={`/Teacher/${classID}/Assignment/${assignID}/Edit`}>
                            <p className="w-full text-left px-4 py-2 hover:bg-content-light">
                                Edit
                            </p>
                        </Link>
                        <button
                            className="w-full text-left px-4 py-2 hover:bg-content-light"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
            <Link href={`/Teacher/${classID}/Assignment/${assignID}`}>


                <div className="p-4 mb-4 flex flex-row gap-3">
                    <div>
                        <FaBookmark className={`top-2 left-2 text-4xl ${status === 'To Do' ? 'text-bookmark1' : status === 'Finished' ? 'text-bookmark2' : 'text-bookmark3'}`} />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl norap xl:text-2xl font-bold text-salate-1000 ">{title}</h2>
                        </div>
                        <p className="text-salate-1000 font-bold mb-2">{description}</p>
                        <p className="text-salate-1000 font-bold text-sm">Due Date: {dueDate}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Teacher_AssignmentCard;
