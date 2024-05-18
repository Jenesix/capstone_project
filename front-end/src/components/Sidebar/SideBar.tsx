"use client";
import React from 'react';
import { FaHome, FaBook, FaBullhorn, FaTasks, FaFolderOpen, FaCheckSquare, FaQuestionCircle, FaUsers } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import Link from 'next/link';


const SideBar: React.FC = () => {

    const pathname = usePathname();
    const isActive = (path: string) => (pathname === path ? 'text-primary' : '');

    return (
        <div className="flex h-screen flex-rown">
            <div className="bg-gray-100 w-auto md:pr-12 flex-shrink-0 pl-4 pt-4 text-salate-1000 md:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)]" >
                <ul className="space-y-2 ">
                    <Link href="/id/Home">
                        <li className={`p-4 flex items-center hover:text-primary transition-colors duration-200 ${isActive('/id/Home')}`}>
                            <FaHome className="mr-3 cursor-pointer text-2xl md:text-32xl" /> <span className="hidden cursor-pointer md:inline">Home</span>
                        </li>
                    </Link>
                    <Link href="/id/Syllabus">
                        <li className={`p-4 flex items-center hover:text-primary transition-colors duration-200 ${isActive('/id/Syllabus')}`}>
                            <FaBook className="mr-3 cursor-pointer text-2xl md:text-32xl" /> <span className="hidden cursor-pointer md:inline">Syllabus</span>
                        </li>
                    </Link>
                    <Link href="/id/Announcement">
                        <li className={`p-4 flex items-center hover:text-primary transition-colors duration-200 ${isActive('/id/Announcement')}`}>
                            <FaBullhorn className="mr-3 cursor-pointer text-2xl md:text-32xl" /> <span className="hidden cursor-pointer md:inline">Announcement</span>
                        </li>
                    </Link>
                    <Link href="/id/Assignment">
                        <li className={`p-4 flex items-center hover:text-primary transition-colors duration-200 ${isActive('/id/Assignment')}`}>
                            <FaTasks className="mr-3 cursor-pointer text-2xl md:text-32xl" /> <span className="hidden cursor-pointer md:inline">Assignment</span>
                        </li>
                    </Link>
                    <Link href="/id/File-Content">
                        <li className={`p-4 flex items-center hover:text-primary transition-colors duration-200 ${isActive('/id/File-Content')}`}>
                            <FaFolderOpen className="mr-3 cursor-pointer text-2xl md:text-32xl" /> <span className="hidden cursor-pointer md:inline">File & Content</span>
                        </li>
                    </Link>
                    <Link href="/id/Attendance">
                        <li className={`p-4 flex items-center hover:text-primary transition-colors duration-200 ${isActive('/id/Attendance')}`}>
                            <FaCheckSquare className="mr-3 cursor-pointer text-2xl md:text-32xl" /> <span className="hidden cursor-pointer md:inline">Attendance</span>
                        </li>
                    </Link>
                    <Link href="/id/QA-board">
                        <li className={`p-4 flex items-center hover:text-primary transition-colors duration-200 ${isActive('/id/QA-board')}`}>
                            <FaQuestionCircle className="mr-3 cursor-pointer text-2xl md:text-32xl" /> <span className="hidden cursor-pointer md:inline">Q&A Board</span>
                        </li>
                    </Link>
                    <Link href="/id/Members">
                        <li className={`p-4 flex items-center hover:text-primary transition-colors duration-200 ${isActive('/id/Members')}`}>
                            <FaUsers className="mr-3 cursor-pointer text-2xl md:text-32xl" /> <span className="hidden md:inline">Members</span>
                        </li>
                    </Link>
                </ul>
            </div>

        </div>
    );
};

export default SideBar;
