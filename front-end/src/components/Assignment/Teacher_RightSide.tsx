import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { FiTrash2, FiUpload } from 'react-icons/fi';
import { AiOutlineFilePdf, AiOutlineFileImage, AiOutlineFile } from 'react-icons/ai';
import Image from 'next/legacy/image';
import { AssignmentTurnin } from '@/interface/interface';
import profile from '../../../public/profile.svg';
import { useUser } from '@/context/UserContext';
import { axioslib } from '@/lib/axioslib';
import { useParams } from 'next/navigation';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Teacher_SubmissionCard from './Teacher_SubmissionCard';


const Teacher_RightSide: React.FC = () => {
    const { classID, assignID, submissionID } = useParams(); //------------ถ้าแก้ submissionID ตรงนี้  แก้อันนี้ด้วย-----------
    
    const mockTurninData = [
        {
            _id: "turnin1",
            user_id: "65090500414",
            firstname: "Natthapon",
            lastname: "Tanateeraanan",
            assignmentID: "assign1",
            turnin_date: "2024-01-01T11:29:00Z",
            status_turnin: "On time",
            score: 85,
            files: ["file1.pdf", "file2.png"]
        },
        {
            _id: "turnin2",
            user_id: "65090500415",
            firstname: "Nadsgfhapon",
            lastname: "Tanadsfgan",
            assignmentID: "assign1",
            turnin_date: "2024-01-02T14:15:00Z",
            status_turnin: "Late",
            score: 75,
            files: ["file3.pdf"]
        },
        {
            _id: "turnin3",
            user_id: "65090500416",
            firstname: "Nadgfsn",
            lastname: "Tdsfgeeradfgan",
            assignmentID: "assign1",
            turnin_date: "2024-01-03T09:45:00Z",
            status_turnin: "On time",
            score: 85,
            files: ["file4.png", "file5.docx"]
        },
        {
            _id: "turnin4",
            user_id: "65090500414",
            firstname: "Natthapon",
            lastname: "Tanateeraanan",
            assignmentID: "assign1",
            turnin_date: "2024-01-01T11:29:00Z",
            status_turnin: "On time",
            score: 85,
            files: ["file1.pdf", "file2.png"]
        },
        {
            _id: "turnin5",
            user_id: "65090500415",
            firstname: "Nadsgfhapon",
            lastname: "Tanadsfgan",
            assignmentID: "assign1",
            turnin_date: "2024-01-02T14:15:00Z",
            status_turnin: "Late",
            score: 75,
            files: ["file3.pdf"]
        },
    ];


    return (
        <div className="flex flex-col pt-6 xl:pt-0 xl:mx-12 min-w-96 max-w-96">
            <h2 className="font-bold text-xl text-salate-1000 mb-2">Submission</h2>
            <div className='overflow-y-auto h-2/3'>

            {mockTurninData.map((submission) => (
                <div className='mb-6 pr-2'>
                <Teacher_SubmissionCard
                key={submission._id}
                giveScoreLink= {`/Teacher/${classID}/Assignment/${assignID}/${submissionID}`} //------------ถ้าแก้ submissionID ตรงนี้  ไปแก้ข้างบนด้วย-----------
                user_id= {submission.user_id}
                firstname= {submission.firstname}
                lastname= {submission.lastname}
                score= {submission.score}
                status_turnin= {submission.status_turnin}
                turnin_date= {submission.turnin_date}
                file_turnin= {submission.files}
                />
            </div>
            ))}
            </div>

        </div>
    );
};

export default Teacher_RightSide;
