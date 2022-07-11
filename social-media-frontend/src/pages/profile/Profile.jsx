import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getUser, sendRequest } from '../../apis/user';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import TopBar from '../../components/topbar/TopBar';
import './profile.scss';

const url = process.env.REACT_APP_BACKEND_URL;

export default function Profile() {
  const sendRequestRes = useSelector(state => state.user.sendRequestRes);
  const [userState, setUserState] = useState(null)
  const currentUser = useSelector(state => state.auth.user);
  const [friendsState, setFriendsSendState] = useState(false);
  const [requestSendState, setRequestSendState] = useState(false);
  let isMountedRef = useRef(false);
  const dispatch = useDispatch();

  const { userId } = useParams();

  useEffect(() => {
    const getUserHandler = async () => {
      try {
        const res = await getUser(userId, dispatch);
        setUserState(res.data);
        setFriendsSendState(res.data.friends.includes(currentUser?._id))
        setRequestSendState(res.data.requestReceived.includes(currentUser?._id));
      } catch (err) {
        console.log(err);
      }
    }
    getUserHandler();
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => {
      isMountedRef.current = false
    }
  }, []);


  const requestSendHandler = async () => {
    try {
      await sendRequest(userId, currentUser?._id, dispatch);
      const res = await getUser(userId);
      setUserState(res.data)
      setRequestSendState(res.data.requestReceived.includes(currentUser?._id));
    } catch (err) {
      console.log(err);
    }
  }

  const RenderButton = () => {
    if (friendsState) {
      return <button style={{ backgroundColor: friendsState ? 'gray' : '' }}>{friendsState && 'Remove Friend'}</button>
    } else {
      return <button onClick={requestSendHandler} style={{ backgroundColor: requestSendState ? 'gray' : '' }}>{requestSendState ? 'Cancel Request' : 'Add Friend'}</button>
    }
    return null;
  }

  return (
    <>
      <TopBar />
      <div className="profile">
        <Sidebar />
        <div className="profile-right">
          <div className="profile-right-top">
            <div className="profile-cover">
              <img className="profile-cover-img" src={userState?.coverPicture || `${process.env.REACT_APP_PUBLIC_FOLDER}/noCover.jpg`} alt="" />
              <img className="profile-user-img" src={userState?.profilePicture || `${process.env.REACT_APP_PUBLIC_FOLDER}/person/noAvatar.png`} alt="" />
            </div>
            <div className="profile-info">
              <h4 className="profile-info-name">{userState?.username}</h4>
              <span className="profile-info-desc">{userState?.desc}</span>
              {currentUser?._id !== userId ? <RenderButton /> : null}
            </div>

          </div>
          <div className="profile-right-bottom">
            <Feed profile userId={userId} />
            <Rightbar profileUser={userState} />
          </div>
        </div>
      </div>
    </>
  )
}
