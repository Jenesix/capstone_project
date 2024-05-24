import React from 'react';
import profile from '../../../public/profile.svg';
import { IoChatbubbleEllipses } from "react-icons/io5";
import Announcementtest from '../../../public/Announcementtest.jpg';
import cristiano from '../../../public/cristiano.jpg';
import Link from 'next/link';
import UserCard from './UserCard';
import Image from 'next/image';

const Post = [
    {
        boardID: "id",
        user_id: "65090500414",
        firstname: "Natthapon",
        lastname: "Tanateeraanan",
        profileImage: Announcementtest,
        title_p: "This is Board's Title 15151010",
        description_p: "Detail of the Board dsa asasdads adsads ads a ds adsads ads adsadsdsa ads  ads dassads das ads ad sadss",
        post_image: cristiano,
        time_p: "15 Jan 2024 16:00",
    },
];

const Comment = [
    {
        user_id: "65090500414",
        firstname: "Natthapon",
        lastname: "Tanateeraanan",
        profileImage: Announcementtest,
        comment: "comment text",
        time_cm: "15 Jan 2024 16:20",
    },
    {
        user_id: "65090500415",
        firstname: "Nfghddfghon",
        lastname: "Tafhdgghernan",
        profileImage: Announcementtest,
        comment: "comment text2",
        time_cm: "15 Jan 2024 16:40",
    },
    {
        user_id: "65090500416",
        firstname: "Ndfghdhfgd",
        lastname: "Tanatedfghdfgf",
        profileImage: Announcementtest,
        comment: "comment text3",
        time_cm: "15 Jan 2024 16:50",
    },
];

const countComment = Comment.length;

const QnADetailPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col mt-12 w-full px-4 sm:px-8 pb-6">
            <Link href="/classID/QnABoard">
                <button className="text-salate-1000 font-bold py-2 px-4 rounded">
                    &lt; Back
                </button>
            </Link>
            <h1 className="text-primary text-center font-bold text-xl sm:text-2xl lg:text-3xl">Q&A Board</h1>

            <div className='grid grid-cols-2 mt-12 2xl:mx-20 text-salate-1000 min-h-screen'>
                {Post.map((post, index) => (
                    <div key={index} className='border-r pr-10'>
                        <div className='flex flex-row'>
                            <UserCard
                                profileImage={post.profileImage}
                                user_id={post.user_id}
                                firstname={post.firstname}
                                lastname={post.lastname}
                                sizeprofile='size-20'
                                sizedivtext=''
                                sizenameuser='text-base'
                                sizeiduser='text-sm'
                            />
                            <p className='pt-5 pl-3 text-sm'>{post.time_p}</p>
                        </div>
                        <h1 className='text-primary font-bold text-2xl mt-4'>{post.title_p}</h1>
                        <p className='mt-4'>{post.description_p}</p>

                        <Image className='mt-8 object-contain h-96' src={post.post_image} alt="postimage" />
                    </div>
                ))}

                <div className='pl-10'>
                    <h2 className="text-salate-1000 text-center font-bold text-2xl max-w-48 mb-5">{countComment} Comment</h2>

                    {Comment.map((comment, index) => (
                        <div key={index} className='mb-5'>
                            <div className='flex flex-row'>
                                <UserCard
                                    profileImage={comment.profileImage}
                                    user_id={comment.user_id}
                                    firstname={comment.firstname}
                                    lastname={comment.lastname}
                                    sizeprofile='size-20'
                                    sizedivtext=''
                                    sizenameuser='text-base'
                                    sizeiduser='text-sm'
                                />
                                <p className='pt-5 pl-3 text-sm'>{comment.time_cm}</p>
                            </div>
                            <div className='ml-12 bg-content-light rounded-tr-3xl rounded-b-3xl'>
                                <p className='p-4 m-4 ml-12'>{comment.comment}</p>
                            </div>
                        </div>
                    ))}
                    <div className='ml-12 bg-content-light rounded-3xl flex flex-row p-2 fixed w-1/3'>
                        <IoChatbubbleEllipses className='ml-4 size-10 content-center' />
                        <input placeholder='Message Here...' type='text' className='pl-4 ml-4 bg-content-light rounded-3xl w-full' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QnADetailPage;
