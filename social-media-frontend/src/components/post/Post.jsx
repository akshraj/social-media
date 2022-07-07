import './post.scss';
import { MoreVert, ThumbUpOutlined } from '@material-ui/icons'
import { Users } from '../../dummyData'
import { useCallback, useState } from 'react';

export default function Post({
  desc,
  image,
  createdAt,
  userId,
  likes,
  comment }) {
  const user = Users.find(u => u.id === userId);
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
            <img className="post-profile-img" src={`${process.env.REACT_APP_PUBLIC_FOLDER}/${user?.profilePicture}`} alt="" />
            <span className="post-username">{user?.username}</span>
            <span className="post-date">{createdAt}</span>
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
            <span className="post-comment-text">{comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}
