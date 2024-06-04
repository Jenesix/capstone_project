"use client"

import React, { useState, useEffect } from 'react';
import { MdEmail } from "react-icons/md";
import Image from 'next/legacy/image';
import profile from '../../../public/profile.svg';
import { User } from '@/interface/interface';
import { axioslib } from '@/lib/axioslib';
import { useParams } from 'next/navigation';
import { HiUserRemove } from "react-icons/hi";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Teacher_MembersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;
    const params = useParams();
    const classID = params.classID;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axioslib.get<User[]>(`/api/user/getuserclass/${classID}`);
                console.log('API response data:', response.data);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        if (classID) {
            fetchUsers();
        }
    }, [classID]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleRemoveUser = (index: number) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure you want to remove this user?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        const updatedUsers = [...users];
                        updatedUsers.splice(indexOfFirstUser + index, 1);
                        setUsers(updatedUsers);
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    return (
        <div className="min-h-screen flex flex-col mt-12 w-full px-4 sm:px-8 pb-6">
            <h1 className="text-primary text-center font-bold text-xl sm:text-2xl lg:text-3xl">Members</h1>
            <div className='justify-center mt-12 mx-4 sm:mx-8 lg:mx-20'>
                <h2 className="text-salate-1000 text-center font-bold text-2xl max-w-48 mb-5">{users.length} People</h2>
                <div className="block overflow-x-auto pr-52 2xl:pr-28">
                    <table className="text-salate-1000 font-semibold rounded-md text-center w-full bg-white mx-auto">
                        <thead>
                            <tr className='h-24 bg-primary-light text-white text-lg px-6 py-3 tracking-wider'>
                                <th className="font-black rounded-tl-4xl px-2 sm:px-6 lg:min-w-96">User</th>
                                <th className="font-black border-x border-salate-1000 px-2 sm:px-6 lg:min-w-72">Faculty</th>
                                <th className="font-black border-x border-salate-1000 px-2 sm:px-6 lg:min-w-72">Department</th>
                                <th className="font-black rounded-tr-4xl px-2 sm:px-6 lg:min-w-72">Major</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.length > 0 ? (
                                currentUsers.map((entry, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-content-light h-28" : "bg-white h-28"}>
                                        <td className="border border-salate-1000 px-2 sm:px-6 py-4 whitespace-nowrap font-extrabold pb-2">
                                            <div className="flex items-center">
                                                <div className="relative min-w-20 min-h-20 rounded-full">
                                                    <Image
                                                        src={profile}
                                                        layout="fill"
                                                        objectFit="cover"
                                                        alt="profile"
                                                    />
                                                </div>
                                                <div className={`text-left ml-4 font-bold flex flex-col min-w-96 ${entry.role === 'teacher' ? 'text-bookmark4' : 'text-salate-1000'}`}>
                                                    <span className='text-lg'>{entry.firstname} {entry.lastname}</span>
                                                    <span className='text-base'>{entry.user_id}</span>
                                                    <span className='text-sm font-semibold flex items-center'><MdEmail />&nbsp;{entry.email}</span>
                                                </div>
                                                {entry.role === 'student' && (
                                                    <HiUserRemove
                                                        className='ml-auto text-bookmark1 size-6 cursor-pointer'
                                                        onClick={() => handleRemoveUser(index)}
                                                    />
                                                )}
                                            </div>
                                        </td>
                                        <td className="border border-salate-1000 px-2 sm:px-6 py-4 whitespace-nowrap">{entry.faculty}</td>
                                        <td className="border border-salate-1000 px-2 sm:px-6 py-4 whitespace-nowrap">{entry.department}</td>
                                        <td className="border border-salate-1000 px-2 sm:px-6 py-4 whitespace-nowrap">{entry.major}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-4">No users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-4 space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || totalPages === 0}
                        className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-primary text-white' : 'bg-white text-primary'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Teacher_MembersPage;
