import './friendSuggestion.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { sendRequest } from '../../apis/user';
import { useNavigate } from 'react-router-dom';


export default function FriendSuggestion({ _id, username, profilePicture, requestReceived, profile = false }) {
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.auth.user);
  const [requestSendState, setRequestSendState] = useState(requestReceived?.includes(currentUser?._id));

  const requestSendHandler = async () => {
    try {
      await sendRequest(_id, currentUser?._id);
      setRequestSendState(prev => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <li className="friend-card" style={{ height: profile ? '120px' : '160px' }}>
      <div className="friend-img-container" onClick={() => navigate(`profile/${_id}`)}>
        <img src={profilePicture ? `${process.env.REACT_APP_BACKEND_IMAGE_URL}/${profilePicture}` : `${process.env.REACT_APP_PUBLIC_FOLDER}/person/noAvatar.png`} alt="" />
      </div>
      <span className="friend-name">{username}</span>
      {!profile && <button onClick={requestSendHandler} style={{ backgroundColor: requestSendState ? 'gray' : '' }}>{requestSendState ? 'Cancel Request' : 'Add Friend'}</button>}
    </li>
  )
}
