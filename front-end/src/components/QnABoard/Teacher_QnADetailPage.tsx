"use client";

import React, { useState } from 'react';
import profile from '../../../public/profile.svg';
import { IoChatbubbleEllipses } from 'react-icons/io5';
import Announcementtest from '../../../public/Announcementtest.jpg';
import cristiano from '../../../public/cristiano.jpg';
import Link from 'next/link';
import UserCard from './UserCard';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import StudentBanner from '../../../public/StudentBanner.png';
import { FiTrash2 } from 'react-icons/fi';

const Post = [
  {
    boardID: 'id',
    user_id: '65090500414',
    firstname: 'Natthapon',
    lastname: 'Tanateeraanan',
    profileImage: Announcementtest,
    title_p: 'Cristiano Ronaldo: An Idol for Excellence and Perseverance in Study and Life',
    description_p:
      'Cristiano Ronaldo, renowned for his exceptional talent and relentless dedication in the world of football, serves as an inspiring figure for students striving for success.',
    post_image: cristiano,
    time_p: '15 Jan 2024 16:00',
  },
];

const Comment = [
  {
    user_id: '65090500418',
    firstname: 'Songrha',
    lastname: 'Teepanagarn',
    profileImage: profile,
    comment: "Ronaldo's dedication to his goals is truly inspiring. His work ethic motivates me to push harder in my studies.",
    time_cm: '15 Jan 2024 16:20',
  },
  {
    user_id: '65090500415',
    firstname: 'Nfghddfghon',
    lastname: 'Tafhdgghernan',
    profileImage: StudentBanner,
    comment: "Seeing Ronaldo's journey reminds me that perseverance pays off. It's a great lesson for anyone aiming to achieve their dreams.",
    time_cm: '15 Jan 2024 16:40',
  },
  {
    user_id: '65090500416',
    firstname: 'Ndfghdhfgd',
    lastname: 'Tanatedfghdfgf',
    profileImage: profile,
    comment: 'Cristiano Ronaldo success story is a perfect example of how hard work and determination can lead to greatness in any field, including academics.',
    time_cm: '15 Jan 2024 16:50',
  },
];

const countComment = Comment.length;

const Teacher_QnADetailPage: React.FC = () => {
  const { classID } = useParams();
  const [comments, setComments] = useState(Comment);

  const handleDeleteComment = (index: number) => {
    setComments(prevComments => prevComments.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col mt-12 w-full px-4 sm:px-8 pb-6">
      <Link href={`/${classID}/QnABoard`}>
        <button className="text-salate-1000 font-bold py-2 px-4 rounded">&lt; Back</button>
      </Link>
      <h1 className="text-primary text-center font-bold text-xl sm:text-2xl lg:text-3xl">Q&A Board</h1>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-12 2xl:mx-20 text-salate-1000">
        {Post.map((post, index) => (
          <div key={index} className="border-r pr-10">
            <div className="flex flex-row">
              <UserCard
                profileImage={post.profileImage}
                user_id={post.user_id}
                firstname={post.firstname}
                lastname={post.lastname}
                sizeprofile="size-20"
                sizedivtext=""
                sizenameuser="text-base"
                sizeiduser="text-sm"
              />
              <p className="pt-5 pl-3 text-sm">{post.time_p}</p>
            </div>
            <h1 className="text-primary font-bold text-2xl mt-4">{post.title_p}</h1>
            <p className="mt-4">{post.description_p}</p>

            <Image className="mt-8 object-contain h-96 sm:h-auto" src={post.post_image} alt="postimage" />
          </div>
        ))}

        <div className="xl:pl-10">
          <h2 className="text-salate-1000 text-center font-bold text-2xl max-w-48 mb-5">{countComment} Comment</h2>

          {comments.map((comment, index) => (
            <div key={index} className="mb-5">
              <div className="flex flex-row">
                <UserCard
                  profileImage={comment.profileImage}
                  user_id={comment.user_id}
                  firstname={comment.firstname}
                  lastname={comment.lastname}
                  sizeprofile="size-20"
                  sizedivtext=""
                  sizenameuser="text-base"
                  sizeiduser="text-sm"
                />
                <p className="pt-5 pl-3 text-sm">{comment.time_cm}</p>
              </div>
              <div className="ml-12 pb-2 bg-content-light rounded-tr-3xl rounded-b-3xl">
                <p className="px-4 pt-4 mx-4 mt-4 ml-12">{comment.comment}</p>
                <FiTrash2 className="ml-auto mr-4 size-5 text-bookmark1 cursor-pointer" onClick={() => handleDeleteComment(index)} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-5 bottom-0 ml-4 bg-content-light rounded-3xl flex items-center justify-center p-4 fixed text-salate-1000 w-auto md:w-96">
        <IoChatbubbleEllipses className="ml-4 size-10 content-center" />
        <input placeholder="Message Here..." type="text" className="pl-2 p-2 ml-4 bg-content-light rounded-3xl w-full text-base md:base" />
      </div>
    </div>
  );
};

export default Teacher_QnADetailPage;
