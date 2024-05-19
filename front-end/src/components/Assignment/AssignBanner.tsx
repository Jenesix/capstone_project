import React from 'react';
import { FaBookmark } from "react-icons/fa";

interface AssignBannerProps {
    color: string;
    text: string;
}

const AssignBanner: React.FC<AssignBannerProps> = ({ color, text }) => {
    return (
        <div className={`flex mt-8 items-center ${color}`}>
            <FaBookmark className="text-4xl" />
            <h1 className="ml-2 mr-6 text-nowrap font-bold">{text}</h1>
        </div>
    );
};

export default AssignBanner;
