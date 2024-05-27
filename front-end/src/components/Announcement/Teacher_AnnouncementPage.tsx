"use client";
import React, { useEffect, useState } from 'react';
import Teacher_AnnouncementCard from './Teacher_AnnouncementCard';
import profile from "../../../public/profile.svg";
import Teacher_NewButton from '../NewEdit/Teacher_NewButton';
import { axioslib } from '../../lib/axioslib';
import { Announcement } from '../../interface/interface';
import { format } from 'date-fns';
import { useParams } from 'next/navigation';

const Teacher_AnnouncementPage: React.FC = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const { classID } = useParams();

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                if (classID) {
                    const response = await axioslib.get(`/api/user/getannounce/${classID}`);
                    const fetchedAnnouncements = response.data.map((announcement: any) => ({
                        ...announcement,
                        time_anm: new Date(announcement.time_anm),
                    }));
                    setAnnouncements(fetchedAnnouncements);
                }
            } catch (error) {
                console.error("Error fetching announcements:", error);
            }
        };

        fetchAnnouncements();
    }, [classID]);

    return (
        <div className="flex flex-col mt-12 w-full px-4 sm:px-8 min-h-screen pb-6">
            <h1 className="text-primary text-center font-bold text-xl sm:text-2xl lg:text-3xl">Announcement</h1>
            <div className="mt-6 2xl:mx-20">
                {announcements.length === 0 ? (
                    <p>No announcements to display.</p>
                ) : (
                    announcements.map((announcement) => {
                        const username = `${announcement.UserID.firstname} ${announcement.UserID.lastname}`;
                        return (
                            <Teacher_AnnouncementCard
                                key={announcement._id}
                                announcementData={{
                                    username,
                                    Date: announcement.time_anm.toISOString().split('T')[0],
                                    Time: format(new Date(announcement.time_anm), 'HH:mm'),
                                    message: announcement.desc_anm || 'No description available',
                                    profileImage: profile,
                                }}
                            />
                        );
                    })
                )}
            </div>
            <div className='flex flex-row'>
                <Teacher_NewButton
                    newLink={`/Teacher/${classID}/Announcement/New`}
                    text='New Announcement'
                />
            </div>
        </div>
    );
};

export default Teacher_AnnouncementPage;
