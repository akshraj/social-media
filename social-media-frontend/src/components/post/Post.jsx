import './post.scss';
import { MoreVert, ThumbUpOutlined } from '@material-ui/icons'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'timeago.js';
import { useNavigate } from 'react-router-dom';
import { deletePost, getPosts, likePost } from '../../apis/posts';
import axios from 'axios';
import { showEditModal, postEditdetails } from '../../redux/slices/postSlice';

const url = process.env.REACT_APP_BACKEND_URL;

export default function Post({
  _id,
  desc,
  image,
  createdAt,
  userId,
  likes,
  comments,
  isProfile }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.user);

  const [liked, setLiked] = useState(likes.length);
  const [user, setUser] = useState(null)
  const [showMore, setShowMore] = useState(false);
  const [isLiked, setIsLiked] = useState(likes.includes(currentUser?._id));
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


  const likeHandler = async () => {
    await likePost(_id, currentUser?._id);
    setIsLiked(prev => !prev);
    setLiked(prev => isLiked ? prev - 1 : prev + 1);
  }

  const handleNavigate = () => {
    if (isProfile) {
      return;
    } else {
      navigate(`profile/${userId}`)
    }
  }

  const showMoreDropDown = () => {
    setShowMore(prev => !prev);
  }

  const deletePostHandler = async () => {
    await deletePost(_id, currentUser?._id);
    await getPosts({ userId: currentUser?._id, dispatch });
  }

  const handleEditPost = () => {
    setShowMore(false);
    dispatch(showEditModal(true));
    dispatch(postEditdetails({ _id, desc }))
  }

  return (
    <div className="post">

      <div className="post-wrapper">
        <div className="post-top">
          <div className="post-top-left">
            <img crossOrigin="anonymous" className="post-profile-img" style={{ cursor: !isProfile ? 'pointer' : 'default' }} src={user?.profilePicture || `${process.env.REACT_APP_PUBLIC_FOLDER}/person/noAvatar.png`} alt="" onClick={handleNavigate} />
            <span className="post-username">{user?.username}</span>
            <span className="post-date">{format(createdAt)}</span>
          </div>
          <div className="post-top-right">
            <MoreVert onClick={showMoreDropDown} className={`post-top-right-icon ${currentUser?._id !== userId ? 'disabled' : ''}`} />
            {showMore && <ul className="post-more-modal">
              <li className="post-more-list-item" onClick={handleEditPost}>Edit</li>
              <li className="post-more-list-item" onClick={deletePostHandler}>Delete</li>
            </ul>
            }
          </div>
        </div>
        <div className="post-center" style={{ marginTop: `${desc ? '10px' : ''}` }}>
          {desc && <span className="post-text">
            {desc}
          </span>}
          {image && <img className="post-img" src={`${process.env.REACT_APP_BACKEND_IMAGE_URL}/${image}`} alt="" />}
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
