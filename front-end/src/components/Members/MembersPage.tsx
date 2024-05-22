import React from 'react';
import { MdEmail } from "react-icons/md";
import Image from 'next/legacy/image';
import profile from '../../../public/profile.svg';

// ข้อมูลหลังบ้าน
const User = [
    {
        user_id: "65090500414",
        email: "nutnutnut@kmutt.ac.th",
        firstname: "Natthapon",
        lastname: "Tanateeraanan",
        profileImage: profile,
        FacultyID: "Faculty of Science",
        DepartmentID: "Department of Computer Science",
        MajorID: "Computer Science",
    },
    {
        user_id: "65090500415",
        email: "godsung@kmutt.ac.th",
        firstname: "Wutthawat",
        lastname: "Saart",
        profileImage: profile,
        FacultyID: "Faculty of Architecture",
        DepartmentID: "Department of Architectural Design",
        MajorID: "Architecture",
    },
    {
        user_id: "65090500416",
        email: "inwzaaaassdsd@kmutt.ac.th",
        firstname: "BoonLong",
        lastname: "JongJarern",
        profileImage: profile,
        FacultyID: "Faculty of Architecture",
        DepartmentID: "Department of Architectural Design",
        MajorID: "Architecture",
    },
    {
        user_id: "65090500417",
        email: "lollsd12@kmutt.ac.th",
        firstname: "Kanyawee",
        lastname: "Bongburapra",
        profileImage: profile,
        FacultyID: "Faculty of Social Sciences and Humanities",
        DepartmentID: "Department of Clinical Psychology",
        MajorID: "Psychology",
    },
    {
        user_id: "65090500414",
        email: "nutnutnut@kmutt.ac.th",
        firstname: "Natthapon",
        lastname: "Tanateeraanan",
        profileImage: profile,
        FacultyID: "Faculty of Science",
        DepartmentID: "Department of Computer Science",
        MajorID: "Computer Science",
    },
    {
        user_id: "65090500415",
        email: "godsung@kmutt.ac.th",
        firstname: "Wutthawat",
        lastname: "Saart",
        profileImage: profile,
        FacultyID: "Faculty of Architecture",
        DepartmentID: "Department of Architectural Design",
        MajorID: "Architecture",
    },
    {
        user_id: "65090500416",
        email: "inwzaaaassdsd@kmutt.ac.th",
        firstname: "BoonLong",
        lastname: "JongJarern",
        profileImage: profile,
        FacultyID: "Faculty of Architecture",
        DepartmentID: "Department of Architectural Design",
        MajorID: "Architecture",
    },
    {
        user_id: "65090500417",
        email: "lollsd12@kmutt.ac.th",
        firstname: "Kanyawee",
        lastname: "Bongburapra",
        profileImage: profile,
        FacultyID: "Faculty of Social Sciences and Humanities",
        DepartmentID: "Department of Clinical Psychology",
        MajorID: "Psychology",
    },
];
// นับจำนวน User
const countUser = User.length;

const Memberspage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col mt-12 w-full px-4 sm:px-8 pb-6">
            <h1 className="text-primary text-center font-bold text-xl sm:text-2xl lg:text-3xl">Members</h1>
            <div className='justify-center mt-12 2xl:mx-20'>
                <h2 className="text-salate-1000 text-center font-bold text-2xl max-w-48 mb-5">{countUser} People</h2>
                <div className="overflow-x-auto">
                    <table className="text-salate-1000 font-semibold rounded-md text-center min-w-full sm:min-w-min bg-white">
                        <thead>
                            <tr className='h-24 bg-primary-light text-white text-lg px-6 py-3 tracking-wider'>
                                <th className="font-black rounded-tl-4xl px-2 sm:px-6 lg:min-w-96">Student</th>
                                <th className="font-black border-x border-salate-1000 px-2 sm:px-6 lg:min-w-72">Faculty</th>
                                <th className="font-black border-x border-salate-1000 px-2 sm:px-6 lg:min-w-72">Department</th>
                                <th className="font-black rounded-tr-4xl px-2 sm:px-6 lg:min-w-72">Major</th>
                            </tr>
                        </thead>
                        <tbody>
                            {User.map((entry, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-content-light h-28" : "bg-white h-28"}>
                                    <td className="border border-salate-1000 px-2 sm:px-6 py-4 whitespace-nowrap font-extrabold">
                                        <div className="flex items-center">
                                            <div className="relative min-w-20 min-h-20 rounded-full overflow-hidden">
                                                <Image
                                                    src={entry.profileImage}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    alt="profile"
                                                />
                                            </div>
                                            <div className="text-left ml-4 font-bold text-salate-1000 flex flex-col min-w-96">
                                                <span className='text-lg'>{entry.firstname} {entry.lastname}</span>
                                                <span className='text-base'>{entry.user_id}</span>
                                                <span className='text-sm font-semibold flex items-center'><MdEmail />&nbsp;{entry.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border border-salate-1000 px-2 sm:px-6 py-4 whitespace-nowrap">{entry.FacultyID}</td>
                                    <td className="border border-salate-1000 px-2 sm:px-6 py-4 whitespace-nowrap">{entry.DepartmentID}</td>
                                    <td className="border border-salate-1000 px-2 sm:px-6 py-4 whitespace-nowrap">{entry.MajorID}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Memberspage;
