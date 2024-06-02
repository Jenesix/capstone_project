import React, { useState, ChangeEvent, useEffect, useCallback } from 'react';
import { FiTrash2, FiUpload } from 'react-icons/fi';
import { AiOutlineFilePdf, AiOutlineFileImage, AiOutlineFile } from 'react-icons/ai';
import Image from 'next/legacy/image';
import profile from '../../../public/profile.svg';
import { useUser } from '@/context/UserContext';
import { axioslib } from '@/lib/axioslib';
import { useParams } from 'next/navigation';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Teacher_SubmissionCard from './Teacher_SubmissionCard';
import UserCard from '../QnABoard/UserCard';
import { AssignmentTurnin, Assignment } from '@/interface/interface';
import { format, parseISO } from 'date-fns';

const Teacher_GiveScoreCard: React.FC = () => {
    const { classID, assignID, turninID } = useParams();
    const { user } = useUser();

    const [assign, setAssign] = useState<Assignment | null>(null);
    const [turnin, setTurnin] = useState<AssignmentTurnin | null>(null);
    const [score, setScore] = useState<number | undefined>(undefined);

    const fetchTurnin = useCallback(async () => {
        try {
            const response = await axioslib.get(`/api/user/getturninbyid/${turninID}`);
            setTurnin(response.data);
            setScore(response.data.score);
            console.log(response.data);
        } catch (error) {
            console.log("Error fetching turnin data", error);
        }
    }, [turninID]);

    const fetchAssign = useCallback(async () => {
        try {
            const response = await axioslib.get(`/api/user/getassignbyid/${assignID}`);
            setAssign(response.data);
        } catch (error) {
            console.log("Error fetching assignment data", error);
        }
    }, [assignID]);

    useEffect(() => {
        fetchTurnin();
        fetchAssign();
    }, [fetchTurnin, fetchAssign]);

    const handleScoreChange = (e: ChangeEvent<HTMLInputElement>) => {
        setScore(e.target.valueAsNumber);
    };

    const handleFileIcon = (fileName: string) => {
        const fileExtension = fileName.split('.').pop();
        switch (fileExtension) {
            case 'pdf':
                return <AiOutlineFilePdf className='text-primary' />;
            case 'png':
            case 'jpg':
            case 'jpeg':
                return <AiOutlineFileImage className='text-primary' />;
            default:
                return <AiOutlineFile className='text-primary' />;
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axioslib.put(`/api/user/editturnin/${turninID}`, {
                score: score
            });
            console.log("Score submitted successfully:", response.data);
            window.location.reload();
        } catch (error) {
            console.error("Error submitting score:", error);
        }
    };

    const colortext = turnin?.status_turnin === "On time" ? "text-bookmark2" : "text-bookmark3";

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };

    return (
        <div className="flex flex-col pt-6 xl:pt-0 xl:mx-12 min-w-96 max-w-96">
            <h2 className="font-bold text-xl text-salate-1000 mb-2">Submission</h2>
            <div className='bg-content-light rounded-lg p-2 pt-6 text-salate-1000'>
                <div className='flex flex-row'>
                    <div className='text-start w-full overflow-hidden'>
                        <UserCard
                            profileImage={profile}
                            user_id={turnin?.UserID.user_id || ''}
                            firstname={turnin?.UserID.firstname || ''}
                            lastname={turnin?.UserID.lastname || ''}
                            sizeprofile='min-w-12 min-h-12'
                            sizedivtext='w-full'
                            sizenameuser='text-sm truncate'
                            sizeiduser='text-xs'
                        />
                    </div>
                    <div className='flex flex-col px-2 py-1 bg-white rounded-lg '>
                        <p className='font-bold'>Score</p>
                        <div className='flex flex-row items-end'>
                            <input
                                value={score || ''}
                                name='score'
                                onChange={handleScoreChange}
                                placeholder="Score"
                                type='number'
                                className='text-sm mt-2 p-2 pl-2 bg-white border rounded-xl w-16 '
                            />
                            <p className='pl-1 text-sm'> /{assign?.fullscore}</p>
                        </div>
                    </div>
                </div>
                <p className='pl-4 font-bold mb-2'>Attachments - {turnin?.file_turnin.length} File(s)</p>
                <div className='bg-white rounded-lg border p-4 mx-4'>
                    {turnin?.file_turnin.map((file, index) => (
                        <div key={index} className='flex items-center mb-2'>
                            {handleFileIcon(file)}
                            <a href={file} target="_blank" className='ml-2 text-primary hover:underline truncate'>
                                {file.substring(file.lastIndexOf('/') + 1)}
                            </a>
                        </div>
                    ))}
                </div>
                <p className='text-center font-bold mt-4'>Turned In</p>
                <div className='flex flex-row justify-center '>
                    <p className={`font-bold mt-2 ${colortext}`}>{turnin?.status_turnin} &nbsp;</p>
                    <p className='font-base mt-2'>{turnin ? new Date(turnin.turnin_date).toLocaleString('en-GB', options) : ''}</p>
                </div>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="text-xs md:text-base bg-bookmark2 text-white font-bold py-4 px-4 md:px-12 lg:px-14 rounded block mx-auto transition-all duration-300 transform hover:scale-105 mt-4"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Teacher_GiveScoreCard;
