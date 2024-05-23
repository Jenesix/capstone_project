import React from 'react';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { StaticImageData } from 'next/image';



interface QnACardProps {
    boardID : string,
    board_title : string,
    board_desc : string,
    postimage : string | StaticImageData;
    time : string,
    size_card : string,
    height_detail : string,
    size_image : string,
    user_id : string,
    profileImage: string | StaticImageData;
    firstname : string,
    lastname : string,
    size_profile : string,
    size_divtext : string,
    size_nameuser : string,
    size_iduser : string,
}

// profileImage, user_id, firstname, lastname, sizeprofile, sizedivtext, sizenameuser, sizeiduser
const QnACard: React.FC<QnACardProps> = ({boardID, board_title, board_desc, postimage, time, size_card, height_detail, size_image, user_id, profileImage, firstname, lastname, size_profile, size_divtext, size_nameuser, size_iduser}) => {

    return (
        <Link href={`QnABoard/${boardID}`}>
        <div className={`bg-white shadow-2xl rounded-lg p-4 pl-12 pt-8 mb-8 mr-8 ${size_card} text-salate-1000 overflow-hidden`}>



            <div className='flex flex-row mb-4'>
                <h1 className='font-bold text-xl text-primary truncate pr-4'>{board_title}</h1>
            </div>

            <div className={`mb-4 ${height_detail} font-semibold truncate whitespace-normal`} >{board_desc}</div>


            <div className=' flex flex-row min-h-20'>
                <div className="flex items-center">
                    <div className={` ${size_profile} rounded-full overflow-hidden`}>
                        <Image
                            src={profileImage}
                            // layout="fill"
                            objectFit="fill"
                            alt="profile"
                        />
                    </div>
                <div className={`text-left ml-2 font-bold text-salate-1000 flex flex-col whitespace-normal flex-grow overflow-hidden ${size_divtext} `}>
                    <span className={size_nameuser}>{firstname} {lastname}</span>
                    <span className={size_iduser}>{user_id}</span>
                </div>
            </div>


                <div className='ml-auto mt-auto flex flex-col items-end'>
                    <div className={` relative mb-2 ${size_image}`}>
                    <Image className={` ${size_image}`}
                            src={postimage}
                            layout='fill'
                            alt="postimage"
                        />
                    </div>
                    <div className='font-base '>{time}</div>
                </div>
            </div>




        </div>
        </Link>
    );
};

export default QnACard;
