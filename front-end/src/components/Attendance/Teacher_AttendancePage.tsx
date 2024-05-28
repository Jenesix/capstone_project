"use client";
import Teacher_NewButton from '../NewEdit/Teacher_NewButton';
import { FiTrash2 } from 'react-icons/fi';

import { useParams } from 'next/navigation';
import Teacher_EditButton from '../NewEdit/Teacher_EditButton';
import Teacher_ViewButton from '../NewEdit/Teacher_ViewButton';

import { format } from 'date-fns';
import { useState, useEffect, useCallback } from 'react';
import { axioslib } from '@/lib/axioslib';
import { Attendance, AttendanceCheck } from '@/interface/interface';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Teacher_AttendancePage: React.FC = () => {
    const { classID } = useParams();

    const [attendances, setAttendances] = useState<(Attendance & { checks: AttendanceCheck[] })[]>([]);

    const fetchAttendance = useCallback(async () => {
        try {
            const response = await axioslib.get(`/api/user/getattend/${classID}`);
            const attendancesData = response.data;

            // Fetch attendance checks for each attendance record
            const attendanceWithChecks = await Promise.all(
                attendancesData.map(async (attendance: Attendance) => {
                    const checkResponse = await axioslib.get(`/api/user/getattendcheck/${attendance._id}`);
                    return { ...attendance, checks: checkResponse.data };
                })
            );

            setAttendances(attendanceWithChecks);
        } catch (error) {
            console.log(error);
        }
    }, [classID]);

    useEffect(() => {
        fetchAttendance();
    }, [fetchAttendance]);

    const handleDeleteAttendance = async (attendanceID: string) => {
        try {
            const attendanceToDelete = attendances.find(attendance => attendance._id === attendanceID);
            if (attendanceToDelete) {
                await Promise.all(attendanceToDelete.checks.map(async (check) => {
                    await axioslib.delete(`/api/user/deleteattendcheck/${check._id}`);
                }));
            }

            await axioslib.delete(`/api/user/deleteattend/${attendanceID}`);

            setAttendances(attendances.filter(attendance => attendance._id !== attendanceID));
        } catch (error) {
            console.log(error);
        }
    };

    const confirmDelete = (attendanceID: string) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this attendance record?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleDeleteAttendance(attendanceID)
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    const formatDate = (date: Date) => {
        return format(date, 'dd MMMM yyyy');
    };

    const countStatus = (checks: AttendanceCheck[], status: string) => {
        return checks.filter((check) => check.status_atd === status).length;
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
                            <th className="font-black border-x border-salate-1000 px-2 sm:px-6 lg:min-w-60">Status</th>
                            <th className="font-black rounded-tr-4xl px-2 sm:px-6 lg:min-w-72">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendances.map((attendance, index) => {
                            const onTimeCount = countStatus(attendance.checks, "On time");
                            const lateCount = countStatus(attendance.checks, "Late");
                            const absentCount = countStatus(attendance.checks, "Absent");

                            return (
                                <tr key={index} className={index % 2 === 0 ? "bg-white h-20" : "bg-white h-20"}>
                                    <td className="border border-salate-1000 px-2 sm:px-6 py-4 whitespace-nowrap font-extrabold">{formatDate(attendance.date_atd)}</td>
                                    <td className="border border-salate-1000 px-2 sm:px-6 py-4 whitespace-nowrap">{attendance.time_start}</td>
                                    <td className="border border-salate-1000 px-2 sm:px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-row justify-evenly items-center">
                                            <div className='bg-bookmark2 px-3 p-1 rounded-3xl'>
                                                <p className='text-white font-bold text-base min-w-6'>{onTimeCount}</p>
                                            </div>
                                            <div className='bg-bookmark3 px-3 p-1 rounded-3xl'>
                                                <p className='text-white font-bold text-base min-w-6'>{lateCount}</p>
                                            </div>
                                            <div className='bg-bookmark1 px-3 p-1 rounded-3xl'>
                                                <p className='text-white font-bold text-base min-w-6'>{absentCount}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border border-salate-1000 px-2 sm:px-6 py-4 whitespace-nowrap">
                                        <div className='flex flex-row justify-evenly items-center'>
                                            <Teacher_EditButton
                                                editLink={`/Teacher/${classID}/Attendance/${attendance._id}/Edit`}
                                            />
                                            <Teacher_ViewButton
                                                viewLink={`/Teacher/${classID}/Attendance/${attendance._id}/View`}
                                            />
                                            <FiTrash2
                                                className="text-bookmark1 cursor-pointer ml-2 size-5"
                                                onClick={() => confirmDelete(attendance._id)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
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

export default Teacher_AttendancePage;
