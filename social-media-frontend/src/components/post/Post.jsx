import './post.scss';
import { MoreVert, ThumbUpOutlined } from '@material-ui/icons'
import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

const url = process.env.REACT_APP_BACKEND_URL;
export default function Post({
  desc,
  image,
  createdAt,
  userId,
  likes,
  comments }) {

  const [user, setUser] = useState({})
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${url}/users/${userId}`);
        setUser(response.data);
      } catch (err) {
        console.log(err)
      }
    }
    getUser();
  }, [userId])

  const [liked, setLiked] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(false);

  const likeHandler = useCallback(() => {
    setIsLiked(prev => !prev);
    setLiked(prev => isLiked ? prev - 1 : prev + 1);
  }, [isLiked]);

  return (
    <div className="post">
      <div className="post-wrapper">
        <div className="post-top">
          <div className="post-top-left">
            <Link to={`profile/${userId}`} style={{ textDecoration: "none" }}>
              <img className="post-profile-img" src={user.profilePicture || `${process.env.REACT_APP_PUBLIC_FOLDER}/person/noAvatar.png`} alt="" />
            </Link>
            <span className="post-username">{user?.username}</span>
            <span className="post-date">{format(createdAt)}</span>
          </div>
          <div className="post-top-right">
            <MoreVert />
          </div>
        </div>
        <div className="post-center" style={{ marginTop: `${desc ? '10px' : ''}` }}>
          {desc && <span className="post-text">
            {desc}
          </span>}
          {image && <img className="post-img" src={`${process.env.REACT_APP_PUBLIC_FOLDER}/${image}`} alt="" />}
        </div>
        <div className="post-bottom">
          <div className="post-bottom-left">
            <ThumbUpOutlined htmlColor={isLiked ? 'blue' : ''} className="like-icon" onClick={likeHandler} />
            {/* <img className="like-icon" src="/assets/heart.png" alt="" onClick={likeHandler} /> */}

            <span className="post-like-counter">{liked} people like it</span>
          </div>
          <div className="post-bottom-right">
            <span className="post-comment-text">{comments.length} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}
