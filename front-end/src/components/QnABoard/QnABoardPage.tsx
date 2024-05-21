import React from 'react';
import QnACard from './QnACard';
import profile from '../../../public/profile.svg';
import Announcementtest from '../../../public/Announcementtest.jpg';


const Post = [
    {
        boardID: "141515",
        user_id: "65090500414",
        firstname: "Natthapon",
        lastname: "Tanateeraanan",
        profileImage: profile,
        title_p: "This is Board's Title",
        description_p: "Detail",
        post_image: Announcementtest,
        time_p: "15 Jan 2024 16:00",
    },
    {
        boardID: "135243",
        user_id: "65090500415",
        firstname: "Nagfdhhn",
        lastname: "Twerewraanan",
        profileImage: profile,
        title_p: "This is Board's Title2",
        description_p: "Detail2",
        post_image: Announcementtest,
        time_p: "16 Jan 2024 16:00",
    },
    {
        boardID: "143456",
        user_id: "65090500416",
        firstname: "Nadfgson",
        lastname: "Tanateertyyan",
        profileImage: profile,
        title_p: "This is Board's Title3 afsdsdfafsdas adfsadsadfsdasadfs asdfadfssdsdfaf",
        description_p: "Detail3 sadf asdfsafsd fsa dsadfasdfdf safdsafsd afsdadf ssadfdfsa adsfadfsdfs sadasdfdfs asdfasdfsadf adsdfs as dfadfs dsaf!!",
        post_image: Announcementtest,
        time_p: "17 Jan 2024 16:00",
    },
    
];
const countPost = Post.length

const QnABoardPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col mt-12 w-full px-4 sm:px-8 pb-6">
            <h1 className="text-primary text-center font-bold text-xl sm:text-2xl lg:text-3xl">Q&A Board</h1>
            <div className=' justify-center mt-12 2xl:mx-20'>
            <h2 className="text-salate-1000 text-center font-bold text-2xl max-w-48 mb-5">{countPost} Board</h2>
            <div className='grid grid-cols-2'>
            {Post.map(post => (
                        <QnACard
                            key={post.boardID}
                            bg_post="bg-white"
                            boardID={post.boardID}
                            board_title={post.title_p}
                            board_desc={post.description_p}
                            postimage={post.post_image}
                            time={post.time_p}
                            size_card="min-h-60"
                            height_detail="min-h-24"
                            size_image="h-24 w-40"
                            user_id={post.user_id}
                            profileImage={post.profileImage}
                            firstname={post.firstname}
                            lastname={post.lastname}
                            size_profile="size-16"
                            size_divtext="min-w-20"
                            size_nameuser="text-base"
                            size_iduser="text-sm"
                        />
                    ))}
            </div>
            </div>
        </div>
        
    );
};

export default QnABoardPage;
