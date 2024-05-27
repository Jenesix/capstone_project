"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { FaHome, FaBook, FaBullhorn, FaTasks, FaFolderOpen, FaCheckSquare, FaQuestionCircle, FaUsers } from 'react-icons/fa';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { axioslib } from '@/lib/axioslib';
import { Class } from '@/interface/interface';

interface SideBarProps {
    role: 'teacher' | 'student';
}

const SideBar: React.FC<SideBarProps> = ({ role }) => {
    const params = useParams();
    const pathname = usePathname();
    const { classID } = params;

    const isActive = (path: string) => {
        return pathname.startsWith(path) ? 'text-primary' : '';
    };

    const basePath = role === 'teacher' ? `/Teacher/${classID}` : `/${classID}`;

    const [classData, setClassData] = useState<Class | undefined>(undefined);

    const fetchClassData = useCallback(async () => {
        try {
            const response = await axioslib.get(`/api/admin/getclassbyid/${classID}`);
            setClassData(response.data);
        } catch (error) {
            console.error('Error fetching class data:', error);
        }
    }, [classID]);

    useEffect(() => {
        if (classID) {
            fetchClassData();
        }
    }, [classID, fetchClassData]);

    return (
        <div className="flex flex-col bg-white md:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)]">
            <div className="sticky top-0">
                <div className="flex flex-col content-center bg-gradient-to-r w-24 md:w-64 lg:w-72 h-28 md:h-36 lg:h-40 from-primary to-primary-light text-white font-black rounded-br-7xl pt-4 md:pt-8 pl-4 md:pl-6 pr-4 pd-4 md:pb-10 transition-all duration-300">
                    <p className="text-xs md:text-2xl lg:text-3xl mt-2 md:mt-0 truncate overflow-hidden whitespace-nowrap">
                        {classData?.class_code}
                    </p>
                    <p className="text-xs md:text-base lg:text-lg mt-2 truncate overflow-hidden whitespace-nowrap">
                        {classData?.class_name}
                    </p>
                </div>
                <div className="w-auto md:pr-12 flex-shrink-0 pl-4 pt-4 text-salate-1000">
                    <ul className="space-y-2">
                        <Link href={`${basePath}/Home`}>
                            <li className={`p-4 flex items-center hover:text-primary transition-colors duration-200 ${isActive(`${basePath}/Home`)}`}>
                                <FaHome className="mr-3 cursor-pointer text-2xl md:text-32xl" /> <span className="hidden cursor-pointer md:inline">Home</span>
                            </li>
                        </Link>
                        <Link href={`${basePath}/Syllabus`}>
                            <li className={`p-4 flex items-center hover:text-primary transition-colors duration-200 ${isActive(`${basePath}/Syllabus`)}`}>
                                <FaBook className="mr-3 cursor-pointer text-2xl md:text-32xl" /> <span className="hidden cursor-pointer md:inline">Syllabus</span>
                            </li>
                        </Link>
                        <Link href={`${basePath}/Announcement`}>
                            <li className={`p-4 flex items-center hover:text-primary transition-colors duration-200 ${isActive(`${basePath}/Announcement`)}`}>
                                <FaBullhorn className="mr-3 cursor-pointer text-2xl md:text-32xl" /> <span className="hidden cursor-pointer md:inline">Announcement</span>
                            </li>
                        </Link>
                        <Link href={`${basePath}/Assignment`}>
                            <li className={`p-4 flex items-center hover:text-primary transition-colors duration-200 ${isActive(`${basePath}/Assignment`)}`}>
                                <FaTasks className="mr-3 cursor-pointer text-2xl md:text-32xl" /> <span className="hidden cursor-pointer md:inline">Assignment</span>
                            </li>
                        </Link>
                        <Link href={`${basePath}/File_Content`}>
                            <li className={`p-4 flex items-center hover:text-primary transition-colors duration-200 ${isActive(`${basePath}/File_Content`)}`}>
                                <FaFolderOpen className="mr-3 cursor-pointer text-2xl md:text-32xl" /> <span className="hidden cursor-pointer md:inline">File & Content</span>
                            </li>
                        </Link>
                        <Link href={`${basePath}/Attendance`}>
                            <li className={`p-4 flex items-center hover:text-primary transition-colors duration-200 ${isActive(`${basePath}/Attendance`)}`}>
                                <FaCheckSquare className="mr-3 cursor-pointer text-2xl md:text-32xl" /> <span className="hidden cursor-pointer md:inline">Attendance</span>
                            </li>
                        </Link>
                        <Link href={`${basePath}/QnABoard`}>
                            <li className={`p-4 flex items-center hover:text-primary transition-colors duration-200 ${isActive(`${basePath}/QnABoard`)}`}>
                                <FaQuestionCircle className="mr-3 cursor-pointer text-2xl md:text-32xl" /> <span className="hidden cursor-pointer md:inline">Q&A Board</span>
                            </li>
                        </Link>
                        <Link href={`${basePath}/Members`}>
                            <li className={`p-4 flex items-center hover:text-primary transition-colors duration-200 ${isActive(`${basePath}/Members`)}`}>
                                <FaUsers className="mr-3 cursor-pointer text-2xl md:text-32xl" /> <span className="hidden md:inline">Members</span>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
