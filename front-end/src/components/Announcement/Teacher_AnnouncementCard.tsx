import React, { useState } from 'react';
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { SlOptionsVertical } from "react-icons/sl";
import { ImBullhorn } from "react-icons/im";

interface AnnouncementCardProps {
    announcementData: {
        username: string;
        Date: string;
        Time: string;
        title: string;
        message: string;
        profileImage: string;
    };
}

const Teacher_AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcementData }) => {
    const { classID, announcementID } = useParams();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const formattedDate = formatDate(announcementData.Date);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
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
        <div className="p-4 sm:p-6 lg:p-8 rounded-4xl shadow-lg bg-white mb-12">
            
            <div className="relative text-salate-1000">
                {/*Option Button*/}
                <SlOptionsVertical className="ml-auto cursor-pointer" onClick={toggleDropdown} />
                {dropdownVisible && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                        <Link href={`/Teacher/${classID}/Announcement/${announcementID}/Edit`}>
                            <p className="w-full text-left px-4 py-2 hover:bg-content-light">
                                Edit
                            </p>
                        </Link>
                        <button
                            className="w-full text-left px-4 py-2 hover:bg-content-light"
                            // onClick={() => console.log('Delete clicked')}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>  


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
                    </div>
                    <div className='flex flex-row ml-4'>
                        <ImBullhorn className='pt-2 size-4 sm:size-6 mr-3 text-salate-1000 min-h-6 sm:min-h-8' />
                        <div className=''>
                            <p className="text-salate-1000 font-bold text-sm sm:text-base xl:text-xl mb-3 bg-content-light rounded-3xl p-1 px-2 sm:p-2 sm:px-4 w-fit">{announcementData.title}</p>
                            <p className="text-salate-1000 font-semibold text-xs sm:text-sm xl:text-lg">{announcementData.message}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Teacher_AnnouncementCard;
