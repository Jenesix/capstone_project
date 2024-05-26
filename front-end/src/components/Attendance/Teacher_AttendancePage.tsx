"use client";
import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdWatchLater } from "react-icons/md";
import { GoXCircleFill } from "react-icons/go";
import Teacher_NewButton from '../NewEdit/Teacher_NewButton';

interface AttendanceEntry {
    date_atd: string;
    time_start: string;
}

interface AttendanceCheckEntry {
    time_check: string;
    status_atd: string;
}

const Attendance: AttendanceEntry[] = [
    {
        date_atd: "19 January 2024",
        time_start: "9:30",
    },
    {
        date_atd: "26 January 2024",
        time_start: "10:30",
    },
    {
        date_atd: "02 February 2024",
        time_start: "12:30",
    },
    {
        date_atd: "22 May 2024",
        time_start: "05:50",
    }
];

const AttendanceCheck: AttendanceCheckEntry[] = [
    {
        time_check: "9:40",
        status_atd: "on time",
    },
    {
        time_check: "10:55",
        status_atd: "late",
    },
    {
        time_check: "-",
        status_atd: "absent",
    },
    {
        time_check: "-",
        status_atd: "-",
    }
];

const getStatusIcon = (status: string) => {
    switch (status) {
        case "on time":
            return <FaCheckCircle className="size-9 fill-bookmark2" />;
        case "late":
            return <MdWatchLater className="size-11 fill-bookmark3" />;
        case "absent":
            return <GoXCircleFill className="size-10 fill-bookmark1" />;
        default:
            return null;
    }
};

const getUpdatedStatus = (date_atd: string, time_start: string, status_atd: string): string => {
    if (status_atd === "absent" || status_atd === "on time" || status_atd === "late") {
        return status_atd;
    }

    const now = new Date();
    const [day, month, year] = date_atd.split(' ');
    const [hours, minutes] = time_start.split(':').map(Number);
    const startTime = new Date(`${month} ${day}, ${year} ${hours}:${minutes}:00`);

    const diff = (now.getTime() - startTime.getTime()) / 60000; // diff in minutes

    if (diff > 15) {
        return "absent";
    }

    return "-";
};

const isWithinJoinTime = (date_atd: string, time_start: string): boolean => {
    const now = new Date();
    const [day, month, year] = date_atd.split(' ');
    const [hours, minutes] = time_start.split(':').map(Number);
    const startTime = new Date(`${month} ${day}, ${year} ${hours}:${minutes}:00`);

    const diff = (startTime.getTime() - now.getTime()) / 60000; // diff in minutes

    return Math.abs(diff) <= 15;
};

const Teacher_AttendancePage: React.FC = () => {
    const [updatedAttendance, setUpdatedAttendance] = useState<AttendanceCheckEntry[]>([]);

    useEffect(() => {
        const newAttendanceCheck = AttendanceCheck.map((check, index) => {
            const entry = Attendance[index];
            const updatedStatus = getUpdatedStatus(entry.date_atd, entry.time_start, check.status_atd);
            return {
                ...check,
                status_atd: updatedStatus,
            };
        });

        setUpdatedAttendance(newAttendanceCheck);
    }, []);

    return (
        <div className="min-h-screen flex flex-col mt-12 w-full px-4 sm:px-8 pb-6">
            <h1 className="text-primary text-center font-bold text-xl sm:text-2xl lg:text-3xl">Attendance</h1>
            <div className='flex justify-center mt-12 2xl:mx-20 overflow-x-auto'>
                <table className="text-salate-1000 font-semibold rounded-md text-lg text-center min-w-full sm:min-w-min bg-white">
                    <thead>
                        <tr className='h-24 bg-primary-light text-white text-xl px-6 py-3 tracking-wider'>
                            <th className="font-black rounded-tl-4xl px-2 sm:px-6 lg:min-w-80">Date</th>
                            <th className="font-black border-x border-salate-1000 px-2 sm:px-6 lg:min-w-60">Time</th>
                            <th className="font-black rounded-tr-4xl px-2 sm:px-6 lg:min-w-60">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Attendance.map((entry, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-content-light h-20" : "bg-white h-20"}>
                                <td className="border border-salate-1000 px-2 sm:px-6 py-4 whitespace-nowrap font-extrabold">{entry.date_atd}</td>
                                <td className="border border-salate-1000 px-2 sm:px-6 py-4 whitespace-nowrap">{entry.time_start}</td>
                                <td className="border border-salate-1000 px-2 sm:px-6 py-4 whitespace-nowrap">
                                    <div className="flex justify-center items-center space-x-2">
                                        {getStatusIcon(updatedAttendance[index]?.status_atd)}
                                        {isWithinJoinTime(entry.date_atd, entry.time_start) && (
                                            <button className="bg-bookmark2 text-white font-bold py-2 px-4 sm:px-10 rounded-full text-xs sm:text-base">
                                                Join
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Teacher_NewButton
            newLink='/Teacher/classID/Attendance/New'
            text='New Attendance'
            />
        </div>
    );
};

export default Teacher_AttendancePage;
