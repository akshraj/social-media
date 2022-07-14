import './friendSuggestion.scss';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, sendRequest } from '../../apis/user';
import { useNavigate, useLocation } from 'react-router-dom';


export default function FriendSuggestion({ _id, username, profilePicture, requestReceived, profile = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.user);
  const [requestSendState, setRequestSendState] = useState(requestReceived?.includes(currentUser?._id));

  const location = useLocation();

  const requestSendHandler = async () => {
    try {
      await sendRequest(_id, currentUser?._id, dispatch);
      setRequestSendState(prev => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  const navigationHandler = async () => {
    if (profile) {
      const profileSlug = location.pathname.split("/");
      profileSlug[2] = _id;
      navigate(profileSlug.join('/'));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(`/profile/${_id}`);
    }
  }

  return (
    <li className="friend-card" style={{ height: profile ? '120px' : '180px' }}>
      <div className="friend-img-container" onClick={navigationHandler}>
        <img src={profilePicture ? `${process.env.REACT_APP_BACKEND_IMAGE_URL}/${profilePicture}` : `${process.env.REACT_APP_PUBLIC_FOLDER}/person/noAvatar.png`} alt="" />
      </div>
      <span className="friend-name">{currentUser?._id === _id ? 'You' : username}</span>
      {!profile && <button onClick={requestSendHandler} style={{ backgroundColor: requestSendState ? 'gray' : '' }}>{requestSendState ? 'Cancel Request' : 'Add Friend'}</button>}
    </li>
  )
}
