"use client";
import { FC, useState, useEffect, useCallback } from 'react';
import { FaFile, FaFilePdf, FaFileImage } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { axioslib } from '@/lib/axioslib';
import { Resource, ResourceFolder } from '@/interface/interface';
import Teacher_NewButton from '../NewEdit/Teacher_NewButton';
import { FiTrash2 } from 'react-icons/fi';

const Teacher_FolderDetailPage: FC = () => {
    const [folder, setFolder] = useState<ResourceFolder | null>(null);
    const [files, setFiles] = useState<Resource[]>([]);
    const { classID, folderID } = useParams();

    const fetchFolder = useCallback(async () => {
        try {
            const response = await axioslib.get(`/api/user/getfolderbyid/${folderID}`);
            setFolder(response.data);
            setFiles(response.data.ResourceID);
        } catch (error) {
            console.log(error);
        }
    }, [folderID]);

    useEffect(() => {
        fetchFolder();
    }, [fetchFolder]);

    const handleDeleteFile = async (fileId: string) => {
        try {
            await axioslib.delete(`/api/user/deleteresource/${fileId}`);
            setFiles(files.filter(file => file._id !== fileId));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container mx-auto p-6 min-h-screen">
            <Link href={`/Teacher/${classID}/File_Content`}>
                <button className="text-salate-1000 font-bold py-2 px-4 rounded">
                    &lt; Back
                </button>
            </Link>
            <h1 className="text-3xl font-bold text-center text-primary mb-6">Folder: {folder?.folder_name}</h1>

            <div>
                <h2 className="text-xl font-bold mb-4 text-gray">Files</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pb-4 text-salate-1000">
                    {files.map((file, index) => (
                        <div
                            key={index}
                            className="p-4 0 rounded shadow flex items-center justify-between "
                        >
                            <div className="flex items-center text-salate-1000 truncate">
                                <FaFile className=" mr-2" size={24} />
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
            <Teacher_NewButton
                newLink={`/Teacher/${classID}/File_Content/${folderID}/New`}
                text='New File'
            />
        </div>
    );
};

export default Teacher_FolderDetailPage;
