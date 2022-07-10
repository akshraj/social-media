import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom'
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import TopBar from '../../components/topbar/TopBar';
import './profile.scss';

const url = process.env.REACT_APP_BACKEND_URL;

export default function Profile() {
  const [user, setUser] = useState({});
  let isMountedRef = useRef(false);

  const { userId } = useParams();

  useEffect(() => {
    isMountedRef.current = true;

    if (isMountedRef.current) {
      const getUser = async () => {
        try {
          const response = await axios.get(`${url}/users/${userId}`);
          setUser(response.data);
        } catch (err) {
          console.log(err);
        }
      }
      getUser();
    }

    return () => {
      isMountedRef.current = false
    }
  }, [userId]);

  useEffect(() => {
    isMountedRef.current = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => {
      isMountedRef.current = false
    }
  }, [])

  return (
    <>
      <TopBar />
      <div className="profile">
        <Sidebar />
        <div className="profile-right">
          <div className="profile-right-top">
            <div className="profile-cover">
              <img className="profile-cover-img" src={user?.coverPicture || `${process.env.REACT_APP_PUBLIC_FOLDER}/noCover.jpg`} alt="" />
              <img className="profile-user-img" src={user?.profilePicture || `${process.env.REACT_APP_PUBLIC_FOLDER}/person/noAvatar.png`} alt="" />
            </div>
            <div className="profile-info">
              <h4 className="profile-info-name">{user?.username}</h4>
              <span className="profile-info-desc">{user?.desc}</span>
            </div>
          </div>
          <div className="profile-right-bottom">
            <Feed profile userId={userId} />
            <Rightbar profileUser={user} />
          </div>
        </div>
      </div>
    </>
  )
}
