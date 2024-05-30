"use client";
import React, { useEffect, useState } from 'react';
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';
import UserCard from './UserCard';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { useParams } from 'next/navigation';
import { Comment, Post, User } from '@/interface/interface';
import { axioslib } from '@/lib/axioslib';
import profile from '../../../public/profile.svg';
import { useUser } from '@/context/UserContext';

const QnADetailPage: React.FC = () => {
  const { classID, postID } = useParams();
  const { user } = useUser();

  const [post, setPost] = useState<Post | null>(null);
  const [postOwner, setPostOwner] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const [newComment, setNewComment] = useState<string>('');
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    try {
      await axioslib.post(`/api/user/createcomment/${postID}`, { comment: newComment });
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  }

  const handleDeleteComment = async (commentID: string) => {
    try {
      await axioslib.delete(`/api/user/deletecomment/${commentID}`)
        .then(() => {
          window.location.reload();
        });
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axioslib.get(`/api/user/getpostbyid/${postID}`);
        setPost(response.data);
        // const commentIds: string[] = response.data.CommentID;

        setComments(response.data.CommentID);
        setPostOwner(response.data.UserID);
      } catch (error) {
        console.error("Error fetching post data", error);
      }
    };

    fetchPostData();
  }, [postID]);

  if (!post || !postOwner) {
    return <div>Loading...</div>;
  }

  const countComment = comments.length;

  const formatDate = (date: string) => {
    const dateObj = parseISO(date);
    return format(dateObj, 'dd/MM/yyyy, HH:mm');
  }

  console.log(comments);


  return (
    <div className="min-h-screen flex flex-col mt-12 w-full px-4 sm:px-8 pb-6">
      <Link href={`/Teacher/${classID}/QnABoard`}>
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
              user_id={postOwner.user_id}
              firstname={postOwner.firstname}
              lastname={postOwner.lastname}
              sizeprofile='size-20'
              sizedivtext=''
              sizenameuser='text-base'
              sizeiduser='text-sm'
            />
            <p className='pt-5 pl-3 text-sm'>{formatDate(String(post.time_p))}</p>
          </div>
          <h1 className='text-primary font-bold text-2xl mt-4'>{post.title_p}</h1>
          <p className='mt-4'>{post.description_p}</p>

          {post.post_image !== '' && (
            <Image className='mt-8 object-contain h-96 sm:h-auto' src={post.post_image} alt="" width={600} height={400} />
          )}
        </div>

        <div className='xl:pl-10'>
          <h2 className="text-salate-1000 text-center font-bold text-2xl max-w-48 mb-5">{countComment} Comment{countComment !== 1 && 's'}</h2>

          {comments.map((comment, index) => (
            <div key={index} className='mb-5'>
              <div className='flex flex-row'>
                <UserCard
                  profileImage={profile}
                  user_id={comment.UserID.user_id}
                  firstname={comment.UserID.firstname}
                  lastname={comment.UserID.lastname}
                  sizeprofile='size-20'
                  sizedivtext=''
                  sizenameuser='text-base'
                  sizeiduser='text-sm'
                />
                <p className='pt-5 pl-3 text-sm'>{formatDate(String(comment.time_cm))}</p>
              </div>
              <div className='ml-24 bg-content-light rounded-tr-3xl rounded-b-3xl w-fit h-fit'>
                <p className='p-2 pt-4 ml-8 mr-12'>{comment.comment}</p>
                <FiTrash2 className="ml-auto mr-4 size-5 text-bookmark1 cursor-pointer" onClick={() => handleDeleteComment(comment._id)} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='mb-5 bottom-0 ml-4 bg-content-light rounded-3xl flex items-center justify-center p-4 fixed text-salate-1000 w-auto md:w-96'>
        <form onSubmit={handleSubmitComment} className='flex flex-row'>
          <IoChatbubbleEllipses className='ml-4 size-10 content-center' />
          <input
            placeholder='Message Here...'
            type='text'
            className='pl-2 p-2 ml-4 bg-content-light rounded-3xl w-full text-base md:base'
            onChange={handleCommentChange}
          />
          <button type='submit' className='text-salate-1000 font-bold px-2 rounded'>Send</button>
        </form>
      </div>
    </div>
  );
};

export default QnADetailPage;
