"use client";
import React from 'react';
import { FaHome, FaBook, FaBullhorn, FaTasks, FaFolderOpen, FaCheckSquare, FaQuestionCircle, FaUsers } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface SideBarProps {
    role: 'teacher' | 'student';
    classID: string;
}

const SideBar: React.FC<SideBarProps> = ({ role, classID }) => {
    const pathname = usePathname();
    const isActive = (path: string) => {
        return pathname.startsWith(path) ? 'text-primary' : '';
    };

    const basePath = role === 'teacher' ? `/Teacher/${classID}` : `/${classID}`;

    return (
        <div className="flex h-100% flex-rown">
            <div className="bg-gray-100 w-auto md:pr-12 flex-shrink-0 pl-4 pt-4 text-salate-1000 md:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)]">
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
    );
};

export default SideBar;
