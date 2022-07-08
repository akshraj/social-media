import Post from '../post/Post';
import Share from '../share/Share';
import './Feed.scss';

import { useEffect } from 'react';
import { getPosts } from '../../apis/posts';
import { useSelector, useDispatch } from 'react-redux';

export default function Feed({ profile, userId }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const { isFetching, posts, error } = useSelector(state => state.post);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        profile ? await getPosts({ userId, profile, dispatch }) : await getPosts({ userId: user?._id, dispatch });
      } catch (err) {
        console.log(err.message)
      }
    }
    getAllPosts();
  }, [profile, userId, user?._id, dispatch]);


  return (
    <div className="feed">
      <div className="feed-wrapper">
        <Share />
        {posts?.map(post => <Post {...post} key={post._id} isProfile={profile} />)}
      </div>
    </div>
  )
}
