import React from 'react';
import profile from '../../../public/profile.svg';
import UserCard from './UserCard';
import QnACard from './QnACard';

// ข้อมูลหลังบ้าน
const User = [
    {
        user_id: "65090500414",
        email: "nutnutnut@kmutt.ac.th",
        firstname: "Natthapon",
        lastname: "Tanateeraanan",
        profileImage: profile,
        FacultyID: "Faculty of Science",
        DepartmentID: "Department of Computer Science",
        MajorID: "Computer Science",
    },
    {
        user_id: "65090500415",
        email: "godsung@kmutt.ac.th",
        firstname: "Wutthawat",
        lastname: "Saart",
        profileImage: profile,
        FacultyID: "Faculty of Architecture",
        DepartmentID: "Department of Architectural Design",
        MajorID: "Architecture",
    },
    
];
// นับจำนวน User
const countUser = User.length


const QnABoardPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col mt-12 w-full px-4 sm:px-8 pb-6">
            <h1 className="text-primary text-center font-bold text-xl sm:text-2xl lg:text-3xl">Q&A Board</h1>
            <div className=' justify-center mt-12 2xl:mx-20'>
            <h2 className="text-salate-1000 text-center font-bold text-2xl max-w-48 mb-5">{countUser} People</h2>
            <div className='grid grid-cols-2'>
            <QnACard/>
            <QnACard/>
            <QnACard/>
            <QnACard/>
            </div>
            {/* <QnACard
            sizecard=""
            /> */}
                        {User.map(user => (
                                    <UserCard
                                        profileImage={user.profileImage}
                                        user_id={user.user_id}
                                        firstname={user.firstname}
                                        lastname={user.lastname}
                                        sizeprofile='min-w-12 min-h-12'
                                        sizedivtext='min-w-96'
                                        sizenameuser='text-base'
                                        sizeiduser='text-xs'
                                    />
                        ))}
            </div>
        </div>
        
    );
};

export default QnABoardPage;
