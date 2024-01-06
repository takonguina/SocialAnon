import axios from 'axios';
import { AuthContext } from '../../ContextAuth';
import { useContext, useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'sonner';
import './timeLine.css';
import { PostPopup } from './postPopup.jsx';
import { formatDate } from '../Tools.js';
import { createPortal } from "react-dom";
import { IoHeart } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { LuMessageSquare } from "react-icons/lu";

export const TimeLine = () => {
  const { authToken, setAuthToken } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const fetchRecentPosts = useCallback(async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/content/get_recent_posts/',
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setPosts(response.data);
    } catch (error) {
      console.error('Échec de la requête', error);
    }
  }, [authToken]);

  const handleUnlike = async (postId) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/content/unlike_post/',
        null,
        {
            params: { id_post: postId },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        }
    );

    if (response.status === 200){
      handleLikeRealTime(postId=postId)
        return toast.success('Post unliked')
      }
    } catch (error) {
      if (error.response?.status === 404){
        return toast.error('The post no longer exists')
      }  else {
        return toast.error('An unexpected error has occurred.')
      }
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/content/like_post/',
        null,
        {
            params: { id_post: postId },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        }
    );

    if (response.status === 200){
      handleLikeRealTime(postId=postId)
        return toast.success('Post liked')
      } else if (response.status === 208){
        handleUnlike(postId)
      }
    } catch (error) {
      if (error.response?.status === 404){
        return toast.error('The post no longer exists')
      } else {
        return toast.error('An unexpected error has occurred.')
      }
    }
  };

  const handleLikeRealTime= (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id_post === postId ? { ...post, liked: !post.liked, likes_post: post.liked ? post.likes_post - 1 : post.likes_post + 1 } : post 
      )
    )};

  const handleButtonClick = () =>{
    setModalOpen(false)
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      fetchRecentPosts();
    }
  }, [setAuthToken, fetchRecentPosts]);

  return (
    <div className="timeline-container">
      {modalOpen && createPortal(<PostPopup selectedPost={selectedPost} onClose={handleButtonClick}/>, document.body)}
      {posts.map((post) => (
        <div key={post.id_post} className="timeline-post">
          <p>{post.content}</p>
            <div className="button-container">
              {post.liked ? (
              <IoHeart size={30} onClick={() => handleLike(post.id_post)} className="like-button" />) : (<IoIosHeartEmpty size={30} onClick={() => handleLike(post.id_post)} className="like-button" />)}<p className='nb-likes'>{post.likes_post}</p>
              <Toaster richColors position="top-center" />
              <LuMessageSquare size={30} onClick={() => {setSelectedPost(post); setModalOpen(true);}} className="answer-button" />
              <p className='date'>{formatDate(post.date_insert)}</p>
            </div>
        </div>
      ))}
      
    </div>
);
};

