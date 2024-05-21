import { FC } from 'react';
import { FaFolder, FaFile } from "react-icons/fa";

import Link from 'next/link';

const files = [
    { name: 'Slide_Week1.pdf', type: 'pdf' },
    { name: 'Lab_test_result.png', type: 'image' },
    { name: 'App.jsx', type: 'code' },
    { name: 'Test.file', type: 'file' },
];

const folders = [
    'Study Lecture Week 1',
    'Study Lecture Week 2',
    'Test Lab For ALL',
    'Researchs',
    'PDF Links',
];

const FileContentPage: FC = () => {
    return (
        <div className="container mx-auto p-6 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-primary mb-6">File & Content</h1>

            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4 text-gray">Folders</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-salate-1000 font-bold">
                    {folders.map((folder, index) => (
                        <Link href='/id/File_Content/Folder' key={index}>
                            <div className="p-2 rounded shadow flex items-center cursor-pointer">
                                <div className="flex items-center px-4">
                                    <FaFolder className="mr-2 " />
                                    <span>{folder}</span>
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
                            className="p-4 rounded shadow flex items-center justify-between "
                        >
                            <div className="flex items-center text-salate-1000">
                                {file.type === 'pdf' && <FaFile className="mr-2 " />}
                                {file.type === 'image' && <FaFile className="mr-2 " />}
                                {file.type === 'code' && <FaFile className="mr-2 " />}
                                {file.type === 'file' && <FaFile className="mr-2 " />}
                                <span className="truncate">{file.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FileContentPage;
