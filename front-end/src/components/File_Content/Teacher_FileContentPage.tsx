"use client";
import { FC } from 'react';
import { FaFolder, FaFile } from "react-icons/fa";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import { axioslib } from '@/lib/axioslib';
import { Resource, ResourceFolder } from '@/interface/interface';
import Teacher_NewButton from '../NewEdit/Teacher_NewButton';
import { FaFolderPlus } from "react-icons/fa";
import { FiTrash2 } from 'react-icons/fi';


const filesmock = [
    { name: 'Slide_Week1.pdf', type: 'pdf' },
    { name: 'Lab_test_result.png', type: 'image' },
    { name: 'App.jsx', type: 'code' },
    { name: 'Test.file', type: 'file' },
];

const foldersmock = [
    'Study Lecture Week 1',
    'Study Lecture Week 2',
    'Test Lab For ALL',
    'Researchs',
    'PDF Links',
];

const Teacher_FileContentPage: FC = () => {
    const [folders, setFolders] = useState<ResourceFolder[]>([]);
    const [files, setFiles] = useState<Resource[]>([]);
    const { classID } = useParams();
    const [newFolderName, setNewFolderName] = useState('');

    const fetchFolder = async () => {
        try {
            const response = await axioslib.get(`/api/user/getfolder/${classID}`);
            setFolders(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchFile = async () => {
        try {
            const response = await axioslib.get(`/api/user/getresource/${classID}`);
            setFiles(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCreateFolder = async (e: React.FormEvent) => {
        try {
            await axioslib.post(`/api/user/createfolder/${classID}`, { folder_name: newFolderName })
                .then(() => {
                    window.location.href = `/Teacher/${classID}/File_Content`;
                });
        } catch (error) {
            console.log(error);
        }
    }


    const handleDeleteFile = async (fileId: string) => {
        try {
            await axioslib.delete(`/api/user/deleteresource/${fileId}`);
            setFiles(files.filter(file => file._id !== fileId));
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteFolder = async (folderId: string) => {
        try {
            await axioslib.delete(`/api/user/deletefolder/${folderId}`);
            setFolders(folders.filter(folder => folder._id !== folderId));
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        fetchFolder();
        fetchFile();
    }, []);

    return (
        <div className="container mx-auto p-6 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-primary mb-6">File & Content</h1>

            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4 text-gray">Folders</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-salate-1000 font-bold">
                    {folders.map((folder, index) => (
                        <div className='rounded shadow flex flex-row w-fit items-center' key={index}>
                            <Link href={`/Teacher/${classID}/File_Content/${folder._id}`}>
                                <div className="p-2 flex items-center cursor-pointer w-full">
                                    <div className="flex items-center px-4 mr-4 ">
                                        <FaFolder className="mr-2" />
                                        <span>{folder.folder_name}</span>
                                    </div>
                                </div>
                            </Link>
                            <FiTrash2
                                className="text-bookmark1 cursor-pointer ml-auto mr-2"
                                onClick={() => handleDeleteFolder(folder._id)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-xl font-bold mb-4 text-gray">Files</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4">
                    {files.map((file, index) => (
                        <div
                            key={index}
                            className="p-4 rounded shadow flex items-center justify-between"
                        >
                            <div className="flex items-center text-salate-1000 truncate">
                                <FaFile className="mr-2 " />
                                <span className="truncate">
                                    <a href={file.file_rs} target="_blank">
                                        {file.file_rs.substring(file.file_rs.lastIndexOf('/') + 1)}
                                    </a>
                                </span>
                            </div>
                            <div className="flex justify-end">
                                <FiTrash2
                                    className="text-bookmark1 cursor-pointer ml-2"
                                    onClick={() => handleDeleteFile(file._id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className=''>

                <Teacher_NewButton
                    newLink={`/Teacher/${classID}/File_Content/New`}
                    text='New File'
                />

                {/* Add Folder Button */}
                <form onSubmit={handleCreateFolder} className="mb-5 px-2 md:pl-4 bottom-20 ml-4 bg-content-light rounded-3xl flex items-center justify-center p-4 fixed text-salate-1000">
                    <input
                        placeholder="Folder Name"
                        type="text"
                        value={newFolderName}
                        name='folder_name'
                        onChange={(e) => setNewFolderName(e.target.value)}
                        className="pl-2 p-2 ml-2 bg-content-light rounded-3xl text-sm md:text-base w-20 md:w-32"
                    />
                    <button type="submit" className="flex flex-row items-center ml-2 p-2 bg-salate-1000 rounded-3xl text-xs md:text-sm text-white"><FaFolderPlus className="md:size-4 mr-2" />Add Folder</button>
                </form>
            </div>
        </div>
    );
};

export default Teacher_FileContentPage;
