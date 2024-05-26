"use client"
import React, { useState } from "react";
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import Image from "next/legacy/image";
import { SlOptionsVertical } from "react-icons/sl";
import Link from "next/link";
import Teacher_EditButton from "../NewEdit/Teacher_EditButton";

const Teacher_AnnouncementCard: React.FC<{ announcementData: any }> = ({ announcementData }) => {
    const formattedDate = formatDate(announcementData.Date);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleDelete = () => {
        // Here you can add the logic to delete the announcement
        // console.log("Delete announcement:", announcementData.id);
    };

    function formatDate(date: string) {
        const dateObj = parseISO(date);
        if (isToday(dateObj)) {
            return 'Today';
        } else if (isYesterday(dateObj)) {
            return 'Yesterday';
        } else {
            return format(dateObj, 'dd/MM/yyyy');
        }
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 rounded-lg shadow-2xl bg-white mb-12 ">
            <div className="flex lg:flex-row items-start">
                <div className="w-16 h-16 lg:w-20 lg:h-20 relative mb-4 lg:mb-0">
                    <Image
                        src={announcementData.profileImage}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        alt="profile"
                        className="rounded-full"
                    />
                </div>
                <div className="ml-4 flex-1">
                    <div className="flex flex-wrap items-center mb-2">
                        <p className="text-primary font-bold text-lg lg:text-2xl mr-2 lg:mr-4">{announcementData.username}</p>
                        <p className="text-salate-1000 font-semibold text-xs lg:text-sm">{formattedDate} at</p>
                        <p className="text-salate-1000 font-semibold text-xs lg:text-sm ml-2">{announcementData.Time}</p>

                        {/* Option Button */}
                        <SlOptionsVertical className="text-salate-1000 ml-auto cursor-pointer ml-auto" onClick={toggleDropdown} />
                        {dropdownVisible && (
                            <div className="text-salate-1000 absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                <Link href={`/Teacher/classID/Announcement/announcementID/Edit`}>
                                    <p className="w-full text-left px-4 py-2 hover:bg-content-light">Edit</p>
                                </Link>
                                <button
                                    className="w-full text-left px-4 py-2 hover:bg-content-light"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                    <p className="text-salate-1000 font-bold text-lg xl:text-xl ">{announcementData.message}</p>
                    <p className="text-salate-1000 font-base text-sm xl:text-lg ">{announcementData.message}</p>
                    <div className="mt-2 w-full lg:max-w-md"></div>
                </div>
            </div>
        </div>
    );
};

export default Teacher_AnnouncementCard;
