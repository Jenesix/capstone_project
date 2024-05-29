import React from 'react';
import Image from 'next/legacy/image';
import { StaticImageData } from 'next/image';

interface UserCardProps {
    profileImage: string | StaticImageData;
    user_id: string;
    firstname: string;
    lastname: string;
    sizeprofile: string;
    sizedivtext: string;
    sizenameuser: string;
    sizeiduser: string;
}

const UserCard: React.FC<UserCardProps> = ({ profileImage, user_id, firstname, lastname, sizeprofile, sizedivtext, sizenameuser, sizeiduser}) => {
    return (
        <div className="flex items-center">
            <div className={`relative ${sizeprofile} rounded-full overflow-hidden`}>
                <Image
                    src={profileImage}
                    layout="fill"
                    objectFit="cover"
                    alt="profile"
                    />
            </div>
            <div className={`text-left ml-4 font-bold text-salate-1000 flex flex-col ${sizedivtext} `}>
                <span className={sizenameuser}>{firstname} {lastname}</span>
                <span className={sizeiduser}>{user_id}</span>
            </div>
        </div>
    );
};

export default UserCard;
