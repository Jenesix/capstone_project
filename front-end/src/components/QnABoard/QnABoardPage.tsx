"use client";
import { useParams } from 'next/navigation';
import React from 'react';
import QnACard_Owner from './QnACard_Owner';
import profile from '../../../public/profile.svg';
import Announcementtest from '../../../public/Announcementtest.jpg';
import cristiano from '../../../public/cristiano.jpg';
import Link from 'next/link';
import { IoMdAddCircle } from "react-icons/io";

const Post = [
    {
        boardID: "id1",
        user_id: "65090500414",
        firstname: "Natthapon",
        lastname: "Tanateeraanan",
        profileImage: profile,
        title_p: "This is Board's Title",
        description_p: "Detail",
        post_image: cristiano,
        time_p: "15 Jan 2024 16:00",
    },
    {
        boardID: "id2",
        user_id: "65090500415",
        firstname: "Nagfdhhn",
        lastname: "Twerewraanan",
        profileImage: profile,
        title_p: "This is Board's Title2",
        description_p: "Detail2 asfdfsdd adfsdfdfsdfsadsdsadfsadsdsasf fd s  sads fds  sadfadfadfsfs  adfssafffs ad sadfsdadfsf adsadfs  dfadsfs adf sfdsadsadf ",
        post_image: Announcementtest,
        time_p: "16 Jan 2024 16:00",
    },
    {
        boardID: "id3",
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

const countPost = Post.length;

const QnABoardPage: React.FC = () => {
    const { classID, postID } = useParams();
    return (
        <div className="min-h-screen flex flex-col mt-12 w-full px-4 sm:px-8 pb-6">
            <h1 className="text-primary text-center font-bold text-xl sm:text-2xl lg:text-3xl">Q&A Board</h1>
            <div className="justify-center mt-12 2xl:mx-20">
                <h2 className="text-salate-1000 text-center font-bold text-2xl max-w-48 mb-5">{countPost} Board</h2>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {Post.map(post => (
                        <QnACard_Owner
                            key={post.boardID}
                            boardID={post.boardID}
                            board_title={post.title_p}
                            editLink={`/${classID}/QnABoard/${postID}/Edit`}
                            board_desc={post.description_p}
                            postimage={post.post_image}
                            time={post.time_p}
                            user_id={post.user_id}
                            profileImage={post.profileImage}
                            firstname={post.firstname}
                            lastname={post.lastname}
                        />
                    ))}
                </div>
            </div>
            <Link href={`/${classID}/QnABoard/New`}>
                <div className='mb-5 pl-20 pr-20 bottom-0 ml-4 bg-content-light rounded-3xl flex flex-row items-center justify-center p-4 fixed text-salate-1000'>
                    <IoMdAddCircle className=' size-10 '/>
                    <p className='pl-2 font-bold text-xl'>New Board</p>
                </div>
            </Link>
        </div>
    );
};

export default QnABoardPage;
