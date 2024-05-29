"use client";
import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdWatchLater } from "react-icons/md";
import { GoXCircleFill } from "react-icons/go";
import { useParams } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { axioslib } from '@/lib/axioslib';
import { Attendance, AttendanceCheck } from '@/interface/interface';

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

const getUpdatedStatus = (time_start: string, time_check: Date | null, status_atd: string): string => {
    if (status_atd === "Absent" || status_atd === "On time" || status_atd === "Late") {
        return status_atd;
    }

    if (time_check) {
        const checkTime = new Date(time_check);
        const [startHours, startMinutes] = time_start.split(':').map(Number);
        const startTime = new Date(checkTime);
        startTime.setHours(startHours, startMinutes, 0, 0);
        const diff = (checkTime.getTime() - startTime.getTime()) / 60000; // diff in minutes

        if (diff <= 15 && diff >= 0) {
            return "On time";
        } else if (diff > 15) {
            return "Late";
        }
    }

    return "Absent";
};

const isWithinJoinTime = (date_atd: Date, time_start: string): boolean => {
    const now = new Date();
    const startDateTime = new Date(date_atd);
    const [hours, minutes] = time_start.split(':').map(Number);
    startDateTime.setHours(hours, minutes, 0, 0);

    const diff = (startDateTime.getTime() - now.getTime()) / 60000; // diff in minutes

    return diff >= -30 && diff <= 0;
};

const determineStatus = (date_atd: Date, time_start: string): string => {
    const now = new Date();
    const startDateTime = new Date(date_atd);
    const [hours, minutes] = time_start.split(':').map(Number);
    startDateTime.setHours(hours, minutes, 0, 0);

    const diff = (now.getTime() - startDateTime.getTime()) / 60000; // diff in minutes

    if (diff <= 15 && diff >= 0) {
        return "On time";
    } else if (diff > 15 && diff <= 30) {
        return "Late";
    }
    return "Absent";
};

const Attendancepage: React.FC = () => {
    const { user } = useUser();
    const { classID } = useParams();
    const [attendances, setAttendances] = useState<Attendance[]>([]);
    const [attendanceChecks, setAttendanceChecks] = useState<AttendanceCheck[]>([]);

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await axioslib.get(`/api/user/getattend/${classID}`);
                setAttendances(response.data);
            } catch (error) {
                console.error("Error fetching attendance data", error);
            }
        };

        const fetchAttendanceCheckData = async () => {
            if (user) {
                try {
                    const response = await axioslib.get(`/api/user/getattendcheckuser/${user._id}`);
                    setAttendanceChecks(response.data);
                } catch (error) {
                    console.error("Error fetching attendance check data", error);
                }
            }
        };

        fetchAttendanceData();
        if (user) {
            fetchAttendanceCheckData();
        }
    }, [user, classID]);

    const handleJoinClick = async (attendanceId: string, date_atd: Date, time_start: string) => {
        if (!user) return;

        const status = determineStatus(date_atd, time_start);
        try {
            const response = await axioslib.post(`/api/user/createattendcheck/${attendanceId}`, {
                status_atd: status,
                time_check: new Date(),
                UserID: user._id,
                AttendanceID: attendanceId,
            });
            console.log('Attendance check submitted:', response.data);
            setAttendanceChecks(prevChecks => [...prevChecks, response.data]);
            setAttendances(prevAttendances =>
                prevAttendances.map(attendance =>
                    attendance._id === attendanceId
                        ? { ...attendance, status_atd: status, time_check: new Date() }
                        : attendance
                )
            );
            window.location.reload();
        } catch (error) {
            console.error('Error submitting attendance check:', error);
        }
    };


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
                        {attendances.map((entry, index) => {
                            const checkEntry = attendanceChecks.find(check => check.AttendanceID === entry._id);
                            const status = checkEntry
                                ? getUpdatedStatus(entry.time_start, new Date(checkEntry.time_check), checkEntry.status_atd)
                                : isWithinJoinTime(new Date(entry.date_atd), entry.time_start)
                                    ? "Join"
                                    : "Absent";

                            return (
                                <tr key={entry._id} className={index % 2 === 0 ? "bg-content-light h-20" : "bg-white h-20"}>
                                    <td className="border border-salate-1000 px-2 sm:px-6 py-4 whitespace-nowrap font-extrabold">{new Date(entry.date_atd).toLocaleDateString()}</td>
                                    <td className="border border-salate-1000 px-2 sm:px-6 py-4 whitespace-nowrap">{entry.time_start}</td>
                                    <td className="border border-salate-1000 px-2 sm:px-6 py-4 whitespace-nowrap">
                                        <div className="flex justify-center items-center space-x-2">
                                            {status === "Join" ? (
                                                <button
                                                    className="bg-bookmark2 text-white font-bold py-2 px-4 sm:px-10 rounded-full text-xs sm:text-base"
                                                    onClick={() => handleJoinClick(entry._id, new Date(entry.date_atd), entry.time_start)}
                                                >
                                                    Join
                                                </button>
                                            ) : (
                                                getStatusIcon(status)
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Attendancepage;
