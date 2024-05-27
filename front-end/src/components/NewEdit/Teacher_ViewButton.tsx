import React from 'react';
import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import Link from 'next/link';


interface Teacher_ViewButtonProps {
    viewLink: string;
}

const Teacher_ViewButton: React.FC<Teacher_ViewButtonProps> = ({viewLink}) => {
    return (
        <Link href={viewLink}>
            <div className='justify-center items-center flex flex-row bg-content-light rounded-3xl text-center text-salate-1000 font-bold p-3 w-fit'>
                <p className='pr-2 text-base md:text-xl'>View</p>
                <FaEye className='size-4 md:size-6'/>
            </div>
        </Link>
    );
};

export default Teacher_ViewButton;
