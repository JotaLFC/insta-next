'use client';

import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { app } from '../firebase';
import moment from 'moment';

export default function CommentSection({ id }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const db = getFirestore(app);

  async function handleSubmit(e) {
    e.preventDefault();
    // Add comment to Firestore
    const commentToPost = comment;
    setComment('');
    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToPost,
      username: session?.user?.username,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  }

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'posts', id, 'comments'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [db, id]);

  return (
    <div>
      {comments.length > 0 && (
        <div className='mx-10 max-h-24 overflow-y-scroll'>
          {comments.map((comment, id) => {
            const commentData = comment.data();
            const formattedDate = commentData.timestamp
              ? moment(commentData.timestamp.toDate()).format(
                  'MMMM Do YYYY, h:mm:ss a'
                )
              : 'Unknown date';

            return (
              <div
                key={id}
                className='flex items-center space-x-2 mb-2 justify-between'
              >
                <img
                  src={commentData.userImage}
                  alt='userimage'
                  className='h-7 rounded-full object-cover border p-[2px]'
                />
                <p className='text-sm flex-1 truncate'>
                  <span className='font-bold text-gray-700'>
                    {commentData.username}
                  </span>{' '}
                  {commentData.comment}
                </p>
                <p className='text-xs text-gray-500'>{formattedDate}</p>
              </div>
            );
          })}
        </div>
      )}
      {session && (
        <form onSubmit={handleSubmit} className='flex items-center p-4 gap-2'>
          <img
            src={session.user.image}
            alt='userimage'
            className='h-10 w-10 rounded-full border p-[4px] object-cover'
          />
          <input
            type='text'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Add a comment...'
            className='border-none flex-1 focus:ring-0 outline-none'
          />
          <button
            disabled={!comment.trim()}
            type='submit'
            className=' text-blue-400 disabled:cursor-not-allowed disabled:text-gray-400'
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}