"use client";
import Teacher_NewButton from '../NewEdit/Teacher_NewButton';
import profile from '../../../public/profile.svg';
import { FiTrash2 } from 'react-icons/fi';

import { useParams } from 'next/navigation';
import Teacher_EditButton from '../NewEdit/Teacher_EditButton';
import Teacher_ViewButton from '../NewEdit/Teacher_ViewButton';


//------------Mock Up Data ----------------

const Attendance = [
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

const AttendanceCheck = [
    {
        status_atd: "On time",
        user_id: "65090500414",
        firstname: "Natthapon",
        lastname: "Tanateeraanan",
        profileImage: profile,
    },
    {
        status_atd: "Late",
        user_id: "65090500415",
        firstname: "Natthapon",
        lastname: "Tanateeraanan",
        profileImage: profile,
    },
    {
        status_atd: "Absent",
        user_id: "65090500416",
        firstname: "Natthapon",
        lastname: "Tanateeraanan",
        profileImage: profile,
    },
    {
        status_atd: "-",
        user_id: "65090500417",
        firstname: "Natthapon",
        lastname: "Tanateeraanan",
        profileImage: profile,
    },
    {
        status_atd: "On time",
        user_id: "65090500418",
        firstname: "Natthapon",
        lastname: "Tanateeraanan",
        profileImage: profile,
    },
    {
        status_atd: "Late",
        user_id: "65090500419",
        firstname: "Natthapon",
        lastname: "Tanateeraanan",
        profileImage: profile,
    },
];

//-----------------------------------------------------

const handleDeleteAttendance = async () => {
    // try {
    //     await axioslib.delete(`/api/user/deleteresource/${fileId}`);
    //     setFiles(files.filter(file => file._id !== fileId));
    // } catch (error) {
    //     console.log(error);
    // }
}

const Teacher_AttendancePage: React.FC = () => {
    // import { useParams } from 'next/navigation';
    // const { classID } = useParams();
    // {`/Teacher/${classID}/Attendance/New`}
    const { classID, attendanceID } = useParams();

    const countStatus = (status: string) => AttendanceCheck.filter(entry => entry.status_atd === status).length;
    const onTimeCount = countStatus("On time");
    const LateCount = countStatus("Late");
    const AbsentCount = countStatus("Absent");

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
                        {Attendance.map((entry, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-white h-20" : "bg-white h-20"}>
                                <td className="border border-salate-1000 px-2 sm:px-6 py-4 whitespace-nowrap font-extrabold">{entry.date_atd}</td>
                                <td className="border border-salate-1000 px-2 sm:px-6 py-4 whitespace-nowrap">{entry.time_start}</td>
                                <td className="border border-salate-1000 px-2 sm:px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-row justify-evenly items-center">

                                        <div className='bg-bookmark2 px-3 p-1 rounded-3xl'>
                                            <p className='text-white font-bold text-base min-w-6'>{onTimeCount}</p>
                                        </div>
                                        <div className='bg-bookmark3 px-3 p-1 rounded-3xl'>
                                            <p className='text-white font-bold text-base min-w-6'>{LateCount}</p>
                                        </div>
                                        <div className='bg-bookmark1 px-3 p-1 rounded-3xl'>
                                            <p className='text-white font-bold text-base min-w-6'>{AbsentCount}</p>
                                        </div>

                                    </div>
                                </td>
                                <td className="border border-salate-1000 px-2 sm:px-6 py-4 whitespace-nowrap">
                                    <div className='flex flex-row justify-evenly items-center'>
                                        <Teacher_EditButton
                                        editLink={`/Teacher/${classID}/Attendance/${attendanceID}/Edit`}
                                        />

                                        <Teacher_ViewButton
                                        viewLink={`/Teacher/${classID}/Attendance/${attendanceID}/View`}
                                        />

                                        <FiTrash2 
                                        className="text-bookmark1 cursor-pointer ml-2 size-5"
                                        onClick={() => handleDeleteAttendance()}
                                        />
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

export default Teacher_AttendancePage;
