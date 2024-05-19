import React from 'react';
import AnnouncementCard from './AnnouncementCard';
import profile from "../../../public/profile.svg";

const Announcement = [
    {
        username: 'Jaylerr eiei',
        Date: '2024-05-18',
        Time: '11:00',
        message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        profileImage: profile,
    },
];

const Announcementpage: React.FC = () => {
    return (
        <div className="flex flex-col mt-12 w-full px-4 sm:px-8 pb-96">
            <h1 className="text-primary text-center font-bold text-xl sm:text-2xl lg:text-3xl">Announcement</h1>
            <div className='mt-6 2xl:mx-20'>
                {Announcement.map((announcement, index) => (
                    <AnnouncementCard key={index} announcementData={announcement} />
                ))}
            </div>
        </div>
    );
};

export default Announcementpage;
