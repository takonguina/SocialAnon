import axios from 'axios';
import { AuthContext } from '../../ContextAuth';
import { useContext, useState, useEffect, useCallback } from 'react';
import './timeLine.css';

export const TimeLine = () => {
  const { authToken, setAuthToken } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

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

  const formatDate = (dateString) => {
    const currentDate = new Date();
    const postDate = new Date(dateString);
  
    const timeDifference = (currentDate - postDate) / (1000 * 60);
  
    if (timeDifference < 60) {
      return `${Math.floor(timeDifference)} minutes ago`;
    } else if (timeDifference < 1440) {
      return `${Math.floor(timeDifference / 60)} hours ago`;
    } else {
      return `${Math.floor(timeDifference / 1440)} days ago`;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      fetchRecentPosts();
    }
  }, [setAuthToken, fetchRecentPosts]);

  const handleLike = async (postId) => {
    try {
      console.log(`Liked post with ID ${postId}`);
    } catch (error) {
      console.error('Échec de la requête de like', error);
    }
  };
  
  const handleReply = (postId) => {
    console.log(`Replying to post with ID ${postId}`);
  };

  return (
    <div className="timeline-container">
    <h1>TimeLine</h1>
    {posts.map((post) => (
      <div key={post.id_post} className="timeline-post">
        <p>{post.content}</p>
        <div className="post-meta">
          <p>{formatDate(post.date_insert)} - Likes : {post.likes_post}</p>
          <button onClick={() => handleLike(post.id_post)}>Like</button>
          <button onClick={() => handleReply(post.id_post)}>Answer</button>
        </div>
      </div>
    ))}
  </div>
);
};