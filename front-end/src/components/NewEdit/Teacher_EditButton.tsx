import React from 'react';
import { MdEdit } from "react-icons/md";
import Link from 'next/link';


interface Teacher_EditButtonProps {
    editLink: string;
}

const Teacher_EditButton: React.FC<Teacher_EditButtonProps> = ({editLink}) => {
    return (
        <Link href={editLink}>
            <div className='justify-center items-center flex flex-row bg-content-light rounded-3xl text-center text-salate-1000 font-bold p-3 w-fit'>
                <p className='pr-2 text-base md:text-xl'>Edit</p>
                <MdEdit className='size-4 md:size-6'/>
            </div>
        </Link>
    );
};

export default Teacher_EditButton;
