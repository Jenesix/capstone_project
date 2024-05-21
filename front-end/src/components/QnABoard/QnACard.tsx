import React from 'react';
import Image from 'next/legacy/image';

// interface UserCardProps {
//     profileImage: string;
//     user_id: string;
//     firstname: string;
//     lastname: string;
//     sizeprofile: string;
//     sizedivtext: string;
//     sizenameuser: string;
//     sizeiduser: string;
// }

// const UserCard: React.FC<UserCardProps> = ({ profileImage, user_id, firstname, lastname, sizeprofile, sizedivtext, sizenameuser, sizeiduser}) => {
//     return (
//         <div className="flex items-center">
//             <div className={`relative ${sizeprofile} rounded-full overflow-hidden`}>
//                 <Image
//                     src={profileImage}
//                     layout="fill"
//                     objectFit="cover"
//                     alt="profile"
//                     />
//             </div>
//             <div className={`text-left ml-4 font-bold text-salate-1000 flex flex-col ${sizedivtext} `}>
//                 <span className={sizenameuser}>{firstname} {lastname}</span>
//                 <span className={sizeiduser}>{user_id}</span>
//             </div>
//         </div>
//     );
// };


interface QnACardProps {
    // sizecard: string;
    // ${sizecard}`
    // profileImage: string;
    // user_id: string;
    // firstname: string;
    // lastname: string;
    // sizeprofile: string;
    // sizedivtext: string;
    // sizenameuser: string;
    // sizeiduser: string;
}
// profileImage, user_id, firstname, lastname, sizeprofile, sizedivtext, sizenameuser, sizeiduser
const QnACard: React.FC<QnACardProps> = ({}) => {
    return (
        <div className='bg-white shadow-2xl rounded-lg p-4 pl-12 mb-8 mr-8 min-h-60 text-salate-1000'>



            <div className='flex flex-row mb-4'>
                <h1 className='font-bold text-xl text-primary'>Test godddddd</h1>
                <div className='ml-auto'>: : :</div>
            </div>

            <div className='mb-4 min-h-24 font-semibold' >detasssil here</div>

            <div className=' flex flex-row min-h-20'>
                <div>UserCard</div>
                <div className='ml-auto mt-auto flex flex-col'>
                    <div className='font-semibold min-h-12'>Image Here</div>
                    <div className='font-base'>time here</div>
                </div>
            </div>




        </div>
    );
};

export default QnACard;
