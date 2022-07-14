import './closeFriend.scss'
import { useNavigate, useLocation } from 'react-router-dom';

export default function CloseFriend({ _id, username, profilePicture }) {
  const navigate = useNavigate();
  const location = useLocation();
  const navigationHandler = () => {
    const profileSlug = location.pathname.split("/");
    if (profileSlug.includes('profile')) {
      profileSlug[2] = _id;
      navigate(profileSlug.join('/'));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(`/profile/${_id}`);
    }
  }
  return (
    <li className="sidebar-friend" onClick={navigationHandler}>
      <img className="sidebar-friend-img" src={profilePicture ? `${process.env.REACT_APP_BACKEND_IMAGE_URL}/${profilePicture}` : `${process.env.REACT_APP_PUBLIC_FOLDER}/person/noAvatar.png`} alt="" />
      <span className="sidebar-friend-name">{username}</span>
    </li>
  )
}
