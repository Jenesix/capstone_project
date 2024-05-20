import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdWatchLater } from "react-icons/md";
import { GoXCircleFill } from "react-icons/go";

const Attendance = [
    {
        date_atd: "19 Jan 2024",
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
        date_atd: "03 February 2024",
        time_start: "12:30",
    }
];

const AttendanceCheck = [
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
const getStatusIcon = (status: String) => {
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

const Attendancepage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col mt-12 w-full px-4 sm:px-8 pb-6">
            <h1 className="text-primary text-center font-bold text-xl sm:text-2xl lg:text-3xl">Attendance</h1>
            <div className='flex justify-center mt-12 2xl:mx-20'>
                <table className= "text-salate-1000 font-semibold rounded-md text-lg text-center min-w-min bg-white ">
                    <thead>
                        <tr className=' h-24 bg-primary-light text-white text-xl px-6 py-3 tracking-wider'>
                            <th className="font-black rounded-tl-4xl  min-w-80 ">Date</th>
                            <th className="font-black border-x border-salate-1000 min-w-60">Time</th>
                            <th className="font-black rounded-tr-4xl min-w-60">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Attendance.map((entry, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-content-light h-20 " : "bg-white h-20"}>
                                <td className="border border-salate-1000 px-6 py-4 whitespace-no-wrap font-extrabold ">{entry.date_atd}</td>
                                <td className="border border-salate-1000 px-6 py-4 whitespace-no-wrap">{entry.time_start}</td>
                                <td className="border border-salate-1000 px-6 py-4 whitespace-no-wrap">
                                <div className="flex justify-center">
                                        {getStatusIcon(AttendanceCheck[index]?.status_atd)}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Attendancepage;
