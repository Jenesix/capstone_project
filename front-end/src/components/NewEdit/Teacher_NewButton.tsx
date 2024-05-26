import React from 'react';
import { IoMdAddCircle } from "react-icons/io";
import Link from 'next/link';


interface Teacher_NewButtonProps {
    newLink: string;
    text: string;
}

const Teacher_NewButton: React.FC<Teacher_NewButtonProps> = ({newLink, text}) => {
    return (
        <Link href={newLink}>
                    <div className='mb-5 px-4 md:px-10 bottom-0 ml-4 bg-content-light rounded-3xl flex items-center justify-center p-4 fixed text-salate-1000'>
                        <IoMdAddCircle className=' size-6 md:size-10 '/>
                        <p className='pl-2 font-bold text-base md:text-xl'>{text}</p>
                    </div>
            </Link>
    );
};

export default Teacher_NewButton;
