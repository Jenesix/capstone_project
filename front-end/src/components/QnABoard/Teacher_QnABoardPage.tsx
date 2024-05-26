"use client";

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
        title_p: "Cristiano Ronaldo: An Idol for Excellence and Perseverance in Study and Life",
        description_p: "Cristiano Ronaldo, renowned for his exceptional talent and relentless dedication in the world of football, serves as an inspiring figure for students striving for success.",
        post_image: cristiano,
        time_p: "15 Jan 2024 16:00",
    },
    {
        boardID: "id2",
        user_id: "65090500415",
        firstname: "Nagfdhhn",
        lastname: "Twerewraanan",
        profileImage: profile,
        title_p: "is there any way to make 4g(lte) faster than 5g?",
        description_p: "I know that not many places provide 5g network and the infrastructure to provide it at a nation wide scale is extremely costly. Is there any way to speed up 4g network with the infrastructure we already have?",
        post_image: Announcementtest,
        time_p: "16 Jan 2024 16:00",
    },
    {
        boardID: "id3",
        user_id: "65090500416",
        firstname: "Nadfgson",
        lastname: "Tanateertyyan",
        profileImage: profile,
        title_p: "What is the difference between transport and tunnel mode in IPsec SAs?",
        description_p: "What is the difference between transport and tunnel mode in IPsec SAs?",
        post_image: Announcementtest,
        time_p: "17 Jan 2024 16:00",
    },
];

const countPost = Post.length;

const Teacher_QnABoardPage: React.FC = () => {
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
                            editLink={"/Teacher/classID/QnABoard/qnaboardID/Edit"}
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
            <Link href="/Teacher/classID/QnABoard/New">
                    <div className='mb-5 pl-20 pr-20 bottom-0 ml-4 bg-content-light rounded-3xl flex flex-row items-center justify-center p-4 fixed text-salate-1000'>
                        <IoMdAddCircle className=' size-10 '/>
                        <p className='pl-2 font-bold text-xl'>New Board</p>
                    </div>
            </Link>
        </div>
    );
};

export default Teacher_QnABoardPage;
