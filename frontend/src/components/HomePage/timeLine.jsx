import axios from 'axios';
import { AuthContext } from '../../ContextAuth';
import { useContext, useState, useEffect, useCallback } from 'react';

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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      fetchRecentPosts();
    }
  }, [setAuthToken, fetchRecentPosts]);

  return (
    <div>
      <h1>TimeLine</h1>
      {posts.map((post) => (
        <div key={post.id_post}>
          <p>{post.content}</p>
          <p>{post.date_insert} - Likes : {post.likes_post}</p>
        </div>
      ))}
    </div>
  );
};