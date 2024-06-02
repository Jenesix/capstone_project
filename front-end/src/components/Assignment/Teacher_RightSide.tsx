import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { axioslib } from '@/lib/axioslib';
import Teacher_SubmissionCard from './Teacher_SubmissionCard';
import { AssignmentTurnin } from '@/interface/interface';

const Teacher_RightSide: React.FC = () => {
    const { classID, assignID } = useParams();
    const [turninData, setTurninData] = useState<AssignmentTurnin[]>([]);

    const fetchTurninData = useCallback(async () => {
        try {
            const response = await axioslib.get(`/api/user/getturnin/${assignID}`);
            setTurninData(response.data);
        } catch (error) {
            console.log("Error fetching turnin data", error);
        }
    }, [assignID]);

    useEffect(() => {
        fetchTurninData();
    }, [fetchTurninData]);

    const formatDateString = (dateString: string | Date): string => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        };
        return date.toLocaleDateString('en-GB', options);
    };

    return (
        <div className="flex flex-col pt-6 xl:pt-0 xl:mx-12 min-w-96 max-w-96">
            <h2 className="font-bold text-xl text-salate-1000 mb-2">Submission</h2>
            <div className='overflow-y-auto h-2/3'>
                {turninData.map((submission, index) => (
                    <div key={index} className='mb-6 pr-2'>
                        <Teacher_SubmissionCard
                            giveScoreLink={`/Teacher/${classID}/Assignment/${assignID}/${submission._id}`}
                            user_id={submission.UserID.user_id}
                            firstname={submission.UserID.firstname}
                            lastname={submission.UserID.lastname}
                            score={submission.score}
                            status_turnin={submission.status_turnin}
                            turnin_date={formatDateString(submission.turnin_date)}
                            file_turnin={submission.file_turnin}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Teacher_RightSide;
