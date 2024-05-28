import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
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

const Teacher_GiveScoreCard: React.FC = () => {
    const { classID, assignID, submissionID } = useParams();
    const { user } = useUser();

    const [assignmentTurninData, setAssignmentTurninData] = useState<AssignmentTurnin>({
        _id: "turnin1",
        user_id: "65090500414",
        firstname: "Natthapon",
        lastname: "Tanateeraanan",
        assignmentID: "assign1",
        turnin_date: "2024-01-01T11:29:00Z",
        status_turnin: "On time",
        score: 85,
        files: ["file1.pdf", "file2.png"]
    });

    const [score, setScore] = useState<number | undefined>(assignmentTurninData.score);
    const [fullScore, setFullScore] = useState<number>(100); // Assuming full score is 100

    const handleScoreChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newScore = Number(e.target.value);
        if (newScore <= fullScore) {
            setScore(newScore);
        } else {
            console.log("Score cannot be higher than full score");
            setScore(fullScore);
        }
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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Handle submission logic
    };

    const colortext = assignmentTurninData.status_turnin === "On time" ? "text-bookmark2" : "text-bookmark3";

    return (
        <div className="flex flex-col pt-6 xl:pt-0 xl:mx-12 min-w-96 max-w-96">
            <h2 className="font-bold text-xl text-salate-1000 mb-2">Submission</h2>
            <div className='bg-content-light rounded-lg p-2 pt-6 text-salate-1000'>
                <div className='flex flex-row'>
                    <div className='text-start w-full overflow-hidden'>
                        <UserCard
                            profileImage={profile}
                            user_id={assignmentTurninData.user_id}
                            firstname={assignmentTurninData.firstname}
                            lastname={assignmentTurninData.lastname}
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
                                value={score}
                                onChange={handleScoreChange}
                                placeholder="Score"
                                type='number'
                                className='text-sm mt-2 p-2 pl-2 bg-white border rounded-xl w-16 '
                            />
                            <p className='pl-1 text-sm'>/{fullScore}</p>
                        </div>
                    </div>
                </div>
                <p className='pl-4 font-bold mb-2'>Attachments - {assignmentTurninData.files.length} File(s)</p>
                <div className='bg-white rounded-lg border p-4 mx-4'>
                    {assignmentTurninData.files.map((file, index) => (
                        <div key={index} className='flex items-center mb-2'>
                            {handleFileIcon(file)}
                            <a href={`/path/to/files/${file}`} target="_blank" rel="noopener noreferrer" className='ml-2 text-primary hover:underline'>
                                {file}
                            </a>
                        </div>
                    ))}
                </div>
                <p className='text-center font-bold mt-4'>Turned In</p>
                <div className='flex flex-row justify-center '>
                    <p className={`font-bold mt-2 ${colortext}`}>{assignmentTurninData.status_turnin} &nbsp;</p>
                    <p className='font-base mt-2'>{new Date(assignmentTurninData.turnin_date).toLocaleString()} </p>
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
