import Post from '../post/Post';
import Share from '../share/Share';
import './Feed.scss';
import { Posts } from '../../dummyData'
import { useQuery } from 'react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Feed() {
  const [data, setData] = useState([])
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get("posts/timeline/62c3d4fb88210821a7be017c");
        setData(response.data);
      } catch (err) {
        console.log(err)
      }
    }
    getPosts();
  }, [])
  return (
    <div className="feed">
      <div className="feed-wrapper">
        <Share />
        {data?.map(post => <Post {...post} key={post._id} />)}
      </div>
    </div>
  )
}
