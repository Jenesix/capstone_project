import React from 'react';
import profile from '../../../public/profile.svg';
import UserCard from '../QnABoard/UserCard';
import Link from 'next/link';

interface Teacher_SubmissionCardProps {
    giveScoreLink: string;
    user_id: string;
    firstname: string;
    lastname: string;
    score: number;
    status_turnin: string;
    turnin_date: string;
    file_turnin: any[]; // Adjust the type as per your actual data structure
}

const Teacher_SubmissionCard: React.FC<Teacher_SubmissionCardProps> = ({
    giveScoreLink,
    user_id,
    firstname,
    lastname,
    score,
    status_turnin,
    turnin_date,
    file_turnin
}) => {
    const colortext = status_turnin === "On time" ? "text-bookmark2" : "text-bookmark3";

    return (
        <Link href={giveScoreLink}>
            <div className='bg-content-light w-full rounded-3xl py-4 px-6'>
                <div className='flex flex-row '>
                    <div className='text-start w-full overflow-hidden'>
                        <UserCard
                            profileImage={profile}
                            user_id={user_id}
                            firstname={firstname}
                            lastname={lastname}
                            sizeprofile='min-w-12 min-h-12'
                            sizedivtext=''
                            sizenameuser='text-sm truncate'
                            sizeiduser='text-xs'
                        />
                    </div>
                    <div className="flex flex-col bg-salate-1000 rounded-full p-2 text-white ml-auto">
                        <span className="font-bold text-sm text-center">{score}</span>
                        <span className="font-bold text-sm">Points</span>
                    </div>
                </div>
                <div className='text-salate-1000 text-sm'>
                    <p className='mt-2 font-bold'>Turned in:&nbsp; <span className={colortext}>{status_turnin}</span> </p>
                    <p className='mt-2 font-base'>{turnin_date}</p>
                    <p className='mt-2 font-bold'>Attachments: &nbsp;<span className='text-primary'>{file_turnin.length} Files</span></p>
                </div>
            </div>
        </Link>
    );
};

export default Teacher_SubmissionCard;
