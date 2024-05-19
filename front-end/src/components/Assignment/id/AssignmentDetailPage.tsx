"use client";
import Link from 'next/link';
import React from 'react';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import profile from '../../../../public/profile.svg';

const AssignmentDetailPage: React.FC = () => {
    const assignment = {
        title: "Math Homework",
        dueDate: "2024-05-21 15:00",
        description: "เฟรมเวิร์คและไลบรารีสำหรับการพัฒนาโปรแกรมเว็บ เช่น React.js Bootstrap และ Node.js เฟรมเวิร์ค Model-View-Controller เฟรมเวิร์คและการพัฒนาฟรอนต์เอนด์ และแบ็คเอนด์ โครงงานขนาดกลาง",
        fullScore: 100,
        pdfFile: "/pdftest.pdf",
        submissions: [
            {
                profileImage: profile,
                name: "PATTANAPOL SAELIM",
                studentNo: "65090500447",
                score: 0,
                submissionFiles: []
            }
        ],
    };

    return (
        <div className="flex flex-col mt-12 w-full px-4 sm:px-8 pb-72">
            <div className="flex items-center mb-8">
                <Link href="/id/Assignment">
                    <button className="  text-salate-1000 font-bold py-2 px-4 rounded">
                        &lt;  Back
                    </button>
                </Link>
                <h1 className="text-primary text-center font-bold text-xl sm:text-2xl lg:text-3xl flex-grow mr-20 mb-2">
                    Assignment
                </h1>
            </div>
            <div className="mx-12">
                <div className="flex flex-row items-center mb-4">
                    <span className="font-bold text-2xl text-primary">{assignment.title}</span>
                </div>
                <div className="flex-grow border-b border-2 border-salate-100 mb-4"></div>
            </div>
            <div className="mx-12 grid grid-cols-1 xl:grid-cols-2 gap-8">
                <LeftSide assignment={assignment} />
                <RightSide submissions={assignment.submissions} />
            </div>
        </div>
    );
};

export default AssignmentDetailPage;
