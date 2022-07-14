import Post from '../post/Post';
import Share from '../share/Share';
import './Feed.scss';

import { useEffect, useState } from 'react';
import { getPosts } from '../../apis/posts';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const url = process.env.REACT_APP_BACKEND_URL;

export default function Feed({ profile, userId }) {
  const user = useSelector(state => state.auth.user);
  const currentUser = useSelector(state => state.auth.user);
  // const posts = useSelector(state => state.post.posts);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        if (profile) {
          const response = await axios.get(`${url}/posts/profile/${userId}`);
          setPosts(response?.data);
        } else {
          const response = await axios.get(`${url}/posts/timeline/${currentUser?._id}`);
          setPosts(response?.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    getAllPosts();
  }, [profile, userId]);

  console.log(posts);

  return (
    <div className="feed">
      <div className="feed-wrapper">
        {(!userId || userId === user?._id) && <Share />}
        {posts?.length > 0 ? posts?.map(post => <Post {...post} key={post._id} isProfile={profile} />) : <div className="feed-no-post-container">
          <h1>There are no posts by {!userId || userId === user?._id ? 'You' : 'User'}</h1>
        </div>}
      </div>
    </div>
  )
}
