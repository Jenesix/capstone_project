import React, { useState } from 'react';
import Link from 'next/link';
import { FaBookmark } from 'react-icons/fa';
import { SlOptionsVertical } from "react-icons/sl";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { axioslib } from '@/lib/axioslib';

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

    const handleDelete = async () => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this assignment?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            await axioslib.delete(`/api/user/deleteassign/${assignID}`);
                            window.location.reload();
                        } catch (error) {
                            console.log(error);
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => setDropdownVisible(false)
                }
            ]
        });
    };

    return (
        <div className='bg-white shadow-lg rounded-4xl'>
            <div className="p-4 mb-4 flex flex-row gap-3">
                <Link href={`/Teacher/${classID}/Assignment/${assignID}`} className="flex-grow">
                        <FaBookmark className={`top-2 left-2 text-4xl ${status === 'To Do' ? 'text-bookmark1' : status === 'Finished' ? 'text-bookmark2' : 'text-bookmark3'}`} />
                        <div className="ml-3">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl xl:text-2xl font-bold text-salate-1000 ">{title}</h2>
                            </div>
                            <p className="text-salate-1000 font-bold mb-2">{description}</p>
                            <p className="text-salate-1000 font-bold text-sm">Due Date: {dueDate}</p>
                        </div>
                </Link>
                <div className="relative text-salate-1000 mt-4 mb-2">
                    <SlOptionsVertical className="cursor-pointer" onClick={toggleDropdown} />
                    {dropdownVisible && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                            <button
                                className="w-full text-left px-4 py-2 hover:bg-content-light"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Teacher_AssignmentCard;
