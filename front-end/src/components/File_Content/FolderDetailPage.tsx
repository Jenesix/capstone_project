"use client";
import { FC } from 'react';
import { FaFile, FaFilePdf, FaFileImage } from 'react-icons/fa';

const folderFiles = [
    { name: 'Document1.pdf', type: 'pdf' },
    { name: 'Image1.png', type: 'image' },
    { name: 'Script.js', type: 'code' },
    { name: 'Notes.txt', type: 'file' },


];

const FolderDetailPage: FC = () => {


    return (
        <div className="container mx-auto p-6 pb-96">
            <h1 className="text-3xl font-bold text-center text-primary mb-6">Folder</h1>

            <div>
                <h2 className="text-xl font-bold mb-4 text-gray">Files</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pb-72 text-salate-1000">
                    {folderFiles.map((file, index) => (
                        <div
                            key={index}
                            className="p-4 0 rounded shadow flex items-center justify-between "
                        >
                            <div className="flex items-center ">
                                {file.type === 'pdf' && <FaFilePdf className=" mr-2" size={24} />}
                                {file.type === 'image' && <FaFile className=" mr-2" size={24} />}
                                {file.type === 'code' && <FaFileImage className=" mr-2" size={24} />}
                                {file.type === 'file' && <FaFile className=" mr-2" size={24} />}
                                <span>{file.name.length > 20 ? `${file.name.slice(0, 17)}...` : file.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FolderDetailPage;
