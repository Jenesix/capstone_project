"use client";
import { FC } from 'react';
import { FaFile, FaFilePdf, FaFileImage } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import { axioslib } from '@/lib/axioslib';
import { Resource, ResourceFolder } from '@/interface/interface';

const folderFiles = [
    { name: 'Document1.pdf', type: 'pdf' },
    { name: 'Image1.png', type: 'image' },
    { name: 'Script.js', type: 'code' },
    { name: 'Notes.txt', type: 'file' },
];

const FolderDetailPage: FC = () => {
    const [folders, setFolders] = useState<ResourceFolder[]>([]);
    const [files, setFiles] = useState<Resource[]>([]);
    const { folderID } = useParams();

    const fetchFolder = async () => {
        try {
            const response = await axioslib.get(`/api/user/getfolderbyid/${folderID}`);
            setFolders(response.data);
            setFiles(response.data.ResourceID);
        } catch (error) {
            console.log(error);
        }
    } 

    useEffect(() => {
        fetchFolder();
    }, []);

    return (
        <div className="container mx-auto p-6 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-primary mb-6">Folder: {folders?.folder_name}</h1>

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
                                {/* <span>{file.name.length > 20 ? `${file.name.slice(0, 17)}...` : file.name}</span> */}
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

export default FolderDetailPage;
