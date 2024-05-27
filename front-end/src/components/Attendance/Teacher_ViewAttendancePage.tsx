"use client";
import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdWatchLater } from "react-icons/md";
import { GoXCircleFill } from "react-icons/go";
import Teacher_NewButton from '../NewEdit/Teacher_NewButton';
import profile from '../../../public/profile.svg';
import Link from 'next/link';

import { useParams } from 'next/navigation';
import UserCard from '../QnABoard/UserCard';



const getStatusIcon = (status: string) => {
    switch (status) {
        case "On time":
            return <FaCheckCircle className="size-9 fill-bookmark2" />;
        case "Late":
            return <MdWatchLater className="size-11 fill-bookmark3" />;
        case "Absent":
            return <GoXCircleFill className="size-10 fill-bookmark1" />;
        default:
            return null;
    }
};

//------------Mock Up Data ----------------

const Attendance = [
    {
        date_atd: "19 January 2024",
        time_start: "9:30",
    },
]

const AttendanceCheck = [
    {
        status_atd: "On time",
        time_check: "9:37",
        user_id: "65090500414",
        firstname: "Natthapon",
        lastname: "Tanateeraanan",
        profileImage: profile,
    },
    {
        status_atd: "Late",
        time_check: "9:48",
        user_id: "65090500415",
        firstname: "Natthapon",
        lastname: "Tanateeraanan",
        profileImage: profile,
    },
    {
        status_atd: "Absent",
        time_check: "-",
        user_id: "65090500416",
        firstname: "Natthapon",
        lastname: "Tanateeraanan",
        profileImage: profile,
    },
    {
        status_atd: "Absent",
        time_check: "-",
        user_id: "65090500417",
        firstname: "Natthapon",
        lastname: "Tanateeraanan",
        profileImage: profile,
    },
    {
        status_atd: "On time",
        time_check: "9:32",
        user_id: "65090500418",
        firstname: "Natthapon",
        lastname: "Tanateeraanan",
        profileImage: profile,
    },
    {
        status_atd: "Late",
        time_check: "9:50",
        user_id: "65090500419",
        firstname: "Natthapon",
        lastname: "Tanateeraanan",
        profileImage: profile,
    },
];

//-----------------------------------------------------

const Teacher_ViewAttendancePage: React.FC = () => {
    const { classID, attendanceID } = useParams();
    const [attendanceData, setAttendanceData] = useState(AttendanceCheck);

    const countStatus = (status: string) => attendanceData.filter(entry => entry.status_atd === status).length;
    const onTimeCount = countStatus("On time");
    const lateCount = countStatus("Late");
    const absentCount = countStatus("Absent");

    const handleStatusChange = (user_id: string, newStatus: string) => {
        setAttendanceData(prevData =>
            prevData.map(entry =>
                entry.user_id === user_id ? { ...entry, status_atd: newStatus } : entry
            )
        );
    };

    return (
        <div className="min-h-screen flex flex-col mt-12 w-full px-4 sm:px-8 pb-6">
            <Link href={`/Teacher/${classID}/Attendance`}>
                <button className="text-salate-1000 font-bold py-2 px-4 rounded">
                    &lt; Back
                </button>
            </Link>
            <h1 className="text-primary text-center font-bold text-xl sm:text-2xl lg:text-3xl">Attendance</h1>
            <div className='flex flex-col justify-center mt-12 2xl:mx-20 overflow-x-auto'>
                <div className='flex flex-row pl-12 pb-5'>
                    <h2 className="text-salate-1000 font-bold text-2xl">{Attendance[0].date_atd}</h2>
                    <div className='bg-bookmark2 px-3 p-1 rounded-3xl ml-2'>
                        <p className='text-white font-bold text-center text-base min-w-6'>{onTimeCount}</p>
                    </div>
                    <div className='bg-bookmark3 px-3 p-1 rounded-3xl'>
                        <p className='text-white font-bold text-center text-base min-w-6'>{lateCount}</p>
                    </div>
                    <div className='bg-bookmark1 px-3 p-1 rounded-3xl'>
                        <p className='text-white font-bold text-center text-base min-w-6'>{absentCount}</p>
                    </div>
                </div>
                <table className="text-salate-1000 font-semibold rounded-md text-lg text-center min-w-full sm:min-w-min bg-white">
                    <thead>
                        <tr className='h-24 bg-primary-light text-white text-xl px-6 py-3 tracking-wider'>
                            <th className="font-black rounded-tl-4xl px-2 sm:px-6 lg:min-w-80">Date</th>
                            <th className="font-black border-x border-salate-1000 px-2 sm:px-6 lg:min-w-60">Time</th>
                            <th className="font-black border-x border-salate-1000 px-2 sm:px-6 lg:min-w-60">Status</th>
                            <th className="font-black rounded-tr-4xl px-2 sm:px-6 lg:min-w-52">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.map((entry, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-content-light h-20" : "bg-white h-20"}>
                                <td className="border border-salate-1000 px-2 sm:px-6 py-4 whitespace-nowrap font-extrabold">
                                    <UserCard
                                        profileImage={entry.profileImage}
                                        user_id={entry.user_id}
                                        firstname={entry.firstname}
                                        lastname={entry.lastname}
                                        sizeprofile='size-20'
                                        sizedivtext=''
                                        sizenameuser='text-base'
                                        sizeiduser='text-sm'
                                    />
                                </td>
                                <td className="border border-salate-1000 px-2 sm:px-6 py-4 whitespace-nowrap">{entry.time_check}</td>
                                <td className="border border-salate-1000 px-2 sm:px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-row justify-evenly items-center">
                                        {getStatusIcon(entry.status_atd)}
                                    </div>
                                </td>
                                <td className="border border-salate-1000 px-2 sm:px-6 py-4 whitespace-nowrap">
                                    <div className='flex flex-row justify-evenly'>
                                        <div className="max-w-sm mx-auto">
                                            <label htmlFor={`AttendanceCheck-${entry.user_id}`} className="block mb-2 text-sm font-medium">Change Status</label>
                                            <select
                                                id={`AttendanceCheck-${entry.user_id}`}
                                                className="border text-sm rounded-lg block w-full p-2.5"
                                                value={entry.status_atd}
                                                onChange={(e) => handleStatusChange(entry.user_id, e.target.value)}
                                            >
                                                <option value="On time">On time</option>
                                                <option value="Late">Late</option>
                                                <option value="Absent">Absent</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Teacher_NewButton
                newLink={`/Teacher/${classID}/Attendance/New`}
                text='New Attendance'
            />
        </div>
    );
};

export default Teacher_ViewAttendancePage;

