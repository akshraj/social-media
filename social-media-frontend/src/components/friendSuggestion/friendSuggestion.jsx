import './friendSuggestion.scss';
import { useState } from 'react';


export default function FriendSuggestion({ _id, username, profilePicture }) {
  const [requestSend, setRequestSend] = useState(false);

  const requestSendHandler = () => {
    setRequestSend(!requestSend);
  }
  return (
    <li className="friend-card">
      <div className="friend-img-container">
        <img src={profilePicture ? `${process.env.REACT_APP_BACKEND_IMAGE_URL}/${profilePicture}` : `${process.env.REACT_APP_PUBLIC_FOLDER}/person/noAvatar.png`} alt="" />
      </div>
      <span className="friend-name">{username}</span>
      <button onClick={requestSendHandler} style={{ backgroundColor: requestSend ? 'gray' : '' }}>{requestSend ? 'request sent' : 'Add Friend'}</button>
    </li>
  )
}
