import React from 'react';
import Teacher_AnnouncementCard from './Teacher_AnnouncementCard';
import profile from "../../../public/profile.svg";
import Teacher_NewButton from '../NewEdit/Teacher_NewButton';

const Announcement = [
    {
        username: 'Jaylerr eiei',
        Date: '2024-05-18',
        Time: '11:00',
        message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        profileImage: profile,
    },
];

const Teacher_AnnouncementPage: React.FC = () => {
    return (
        <div className="flex flex-col mt-12 w-full px-4 sm:px-8 min-h-screen pb-6">
            <h1 className="text-primary text-center font-bold text-xl sm:text-2xl lg:text-3xl">Announcement</h1>
            <div className='mt-6 2xl:mx-20'>
                {Announcement.map((announcement, index) => (
                    <Teacher_AnnouncementCard key={index} announcementData={announcement} />
                ))}
            </div>
            <div className='flex flex-row'>
                <Teacher_NewButton
                newLink='/Teacher/classID/Announcement/New'
                text='New Announcement'
                />
            </div>
        </div>
    );
};

export default Teacher_AnnouncementPage;
