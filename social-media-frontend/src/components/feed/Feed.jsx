import Post from '../post/Post';
import Share from '../share/Share';
import './Feed.scss';

import { useEffect, useState } from 'react';
import { getPosts } from '../../apis/posts';
import LocalStorage from '../../utils/localStorage';

const local = new LocalStorage();

export default function Feed({ profile, userId }) {
  const user = JSON.parse(local.getItem('user'));

  const [data, setData] = useState([])
  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const response = profile ? await getPosts(userId, profile) : await getPosts(user?._id);
        setData(response.data);
      } catch (err) {
        console.log(err.message)
      }
    }
    getAllPosts();
  }, [profile, userId])

  return (
    <div className="feed">
      <div className="feed-wrapper">
        <Share />
        {data?.map(post => <Post {...post} key={post._id} />)}
      </div>
    </div>
  )
}
