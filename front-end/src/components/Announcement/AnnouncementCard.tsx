import React from 'react';
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import Image from 'next/legacy/image';

interface AnnouncementCardProps {
    announcementData: {
        username: string;
        Date: string;
        Time: string;
        message: string;
        profileImage: string;
    };
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcementData }) => {
    const formattedDate = formatDate(announcementData.Date);

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
        <div className="p-4 sm:p-6 lg:p-8 rounded-lg shadow-2xl bg-white mb-12">
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
                    <p className="text-salate-1000 font-bold text-sm xl:text-lg">{announcementData.message}</p>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementCard;
