"use client";
import React, { useEffect, useState } from 'react';
import { IoChatbubbleEllipses } from "react-icons/io5";
import Link from 'next/link';
import UserCard from './UserCard';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Comment, Post, User } from '@/interface/interface';
import { axioslib } from '@/lib/axioslib';
import profile from '../../../public/profile.svg';

const QnADetailPage: React.FC = () => {
    const { classID, qnaboardID } = useParams();
    console.log("classID:", classID);
    console.log("postID:", qnaboardID);

    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axioslib.get(`/api/user/getpostbyid/${qnaboardID}`);
                console.log("Post data response:", response.data);
                setPost(response.data);
                const commentIds: string[] = response.data.CommentID;
                // ต้อง Fetch ข้อมูล Comment จาก CommentID ที่ได้จาก Post

                setComments([]); // Mock up เป็น Array ว่างก่อน
                setUser(response.data.UserID);
            } catch (error) {
                console.error("Error fetching post data", error);
            }
        };

        fetchPostData();
    }, [qnaboardID]);

    console.log("post:", post);
    console.log("comments:", comments);
    console.log("user:", user);

    if (!post || !user) {
        return <div>Loading...</div>;
    }

    const countComment = comments.length;

    return (
        <div className="min-h-screen flex flex-col mt-12 w-full px-4 sm:px-8 pb-6">
            <Link href={`/${classID}/QnABoard`}>
                <button className="text-salate-1000 font-bold py-2 px-4 rounded">
                    &lt; Back
                </button>
            </Link>
            <h1 className="text-primary text-center font-bold text-xl sm:text-2xl lg:text-3xl">Q&A Board</h1>

            <div className='grid grid-cols-1 xl:grid-cols-2 gap-4 mt-12 2xl:mx-20 text-salate-1000'>
                <div className='border-r pr-10'>
                    <div className='flex flex-row'>
                        <UserCard
                            profileImage={profile}
                            user_id={user.user_id}
                            firstname={user.firstname}
                            lastname={user.lastname}
                            sizeprofile='size-20'
                            sizedivtext=''
                            sizenameuser='text-base'
                            sizeiduser='text-sm'
                        />
                        <p className='pt-5 pl-3 text-sm'>{new Date(post.time_p).toLocaleString()}</p>
                    </div>
                    <h1 className='text-primary font-bold text-2xl mt-4'>{post.title_p}</h1>
                    <p className='mt-4'>{post.description_p}</p>

                    <Image className='mt-8 object-contain h-96 sm:h-auto' src={post.post_image} alt="postimage" width={600} height={400} />
                </div>

                <div className='xl:pl-10'>
                    <h2 className="text-salate-1000 text-center font-bold text-2xl max-w-48 mb-5">{countComment} Comment{countComment !== 1 && 's'}</h2>

                    {comments.map((comment, index) => (
                        <div key={index} className='mb-5'>
                            <div className='flex flex-row'>
                                <UserCard
                                    profileImage={profile}
                                    user_id={comment.UserID}
                                    firstname={user.firstname}
                                    lastname={user.lastname}
                                    sizeprofile='size-20'
                                    sizedivtext=''
                                    sizenameuser='text-base'
                                    sizeiduser='text-sm'
                                />
                                <p className='pt-5 pl-3 text-sm'>{new Date(comment.time_cm).toLocaleString()}</p>
                            </div>
                            <div className='ml-12 bg-content-light rounded-tr-3xl rounded-b-3xl'>
                                <p className='p-4 m-4 ml-12'>{comment.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='mb-5 bottom-0 ml-4 bg-content-light rounded-3xl flex items-center justify-center p-4 fixed text-salate-1000 w-auto md:w-96'>
                <IoChatbubbleEllipses className='ml-4 size-10 content-center' />
                <input placeholder='Message Here...' type='text' className='pl-2 p-2 ml-4 bg-content-light rounded-3xl w-full text-base md:base' />
            </div>
        </div>
    );
};

export default QnADetailPage;
