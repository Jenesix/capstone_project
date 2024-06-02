"use client";
import { FC, useState, useEffect, useCallback } from 'react';
import { FaFolder, FaFile } from "react-icons/fa";
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { axioslib } from '@/lib/axioslib';
import { Resource, ResourceFolder } from '@/interface/interface';

const FileContentPage: FC = () => {
    const [folders, setFolders] = useState<ResourceFolder[]>([]);
    const [files, setFiles] = useState<Resource[]>([]);
    const { classID } = useParams();

    const fetchFolder = useCallback(async () => {
        try {
            const response = await axioslib.get(`/api/user/getfolder/${classID}`);
            setFolders(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [classID]);

    const fetchFile = useCallback(async () => {
        try {
            const response = await axioslib.get(`/api/user/getresource/${classID}`);
            setFiles(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [classID]);

    useEffect(() => {
        fetchFolder();
        fetchFile();
    }, [fetchFolder, fetchFile]);

    return (
        <div className="container mx-auto p-6 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-primary mb-6">File & Content</h1>

            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4 text-gray">Folders</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-salate-1000 font-bold">
                    {folders.map((folder, index) => (
                        <Link href={`/${classID}/File_Content/${folder._id}`} key={index}>
                            <div className="p-2 rounded shadow flex items-center cursor-pointer">
                                <div className="flex items-center px-4">
                                    <FaFolder className="mr-2 " />
                                    <span>{folder.folder_name}</span>
                                </div>
                            </div>
                        </Link>
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
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FileContentPage;
