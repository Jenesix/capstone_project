"use client";

import React, { useState, useEffect } from 'react';
import QnACard_Owner from './QnACard_Owner';
import profile from '../../../public/profile.svg';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { IoMdAddCircle } from "react-icons/io";
import { axioslib } from '../../lib/axioslib';
import { Post, User } from '../../interface/interface';

interface PostWithUser extends Omit<Post, 'UserID'> {
    UserID: User;
}

const QnABoardPage: React.FC = () => {
    const [posts, setPosts] = useState<PostWithUser[]>([]);
    const { classID } = useParams();

    useEffect(() => {
        if (classID) {
            axioslib.get(`/api/user/getpost/${classID}`)
                .then(response => {
                    setPosts(response.data);
                })
                .catch(error => {
                    console.error('Error fetching posts:', error);
                });
        }
    }, [classID]);

    const countPost = posts.length;

    return (
        <div className="min-h-screen flex flex-col mt-12 w-full px-4 sm:px-8 pb-6">
            <h1 className="text-primary text-center font-bold text-xl sm:text-2xl lg:text-3xl">Q&A Board</h1>
            <div className="justify-center mt-12 2xl:mx-20">
                <h2 className="text-salate-1000 text-center font-bold text-2xl max-w-48 mb-5">{countPost} Board{countPost !== 1 ? 's' : ''}</h2>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {posts.map(post => (
                        <QnACard_Owner
                            key={post._id}
                            boardID={post._id}
                            board_title={post.title_p}
                            editLink={`/${classID}/QnABoard/${post._id}/Edit`}
                            board_desc={post.description_p}
                            postimage={post.post_image}
                            time={new Date(post.time_p).toLocaleString()}
                            user_id={post.UserID._id}
                            profileImage={profile}
                            firstname={post.UserID.firstname}
                            lastname={post.UserID.lastname}
                        />
                    ))}
                </div>
            </div>
            <Link href={`/${classID}/QnABoard/New`}>
                <div className='mb-5 pl-20 pr-20 bottom-0 ml-4 bg-content-light rounded-3xl flex flex-row items-center justify-center p-4 fixed text-salate-1000'>
                    <IoMdAddCircle className=' size-10 ' />
                    <p className='pl-2 font-bold text-xl'>New Board</p>
                </div>
            </Link>
        </div>
    );
};

export default QnABoardPage;
