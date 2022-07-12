import './closeFriend.scss'
import { useNavigate } from 'react-router-dom';

export default function CloseFriend({ _id, username, profilePicture }) {
  const navigate = useNavigate();
  return (
    <li className="sidebar-friend" onClick={() => navigate(`profile/${_id}`)}>
      <img className="sidebar-friend-img" src={profilePicture ? `${process.env.REACT_APP_BACKEND_IMAGE_URL}/${profilePicture}` : `${process.env.REACT_APP_PUBLIC_FOLDER}/person/noAvatar.png`} alt="" />
      <span className="sidebar-friend-name">{username}</span>
    </li>
  )
}
