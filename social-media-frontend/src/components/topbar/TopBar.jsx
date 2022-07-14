import './topbar.scss'
import { Link, useNavigate } from 'react-router-dom';
import { Search, Person, Chat, Notifications } from '@material-ui/icons'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { signOut } from '../../redux/slices/authSlice'
import RequestReceivedUserCard from '../requestReceivedUserCard/RequestReceivedUserCard';
import { getAllPendingRequests } from '../../apis/user';
import { setProfileId } from '../../redux/slices/userSlice';
import { useLocation } from 'react-router-dom';

const imageUrl = process.env.REACT_APP_BACKEND_IMAGE_URL
export default function TopBar() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showPersonListDropDown, setShowPersonListDropDown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.auth.user);
  const pendingFriendRequests = useSelector(state => state.user.pendingRequests);
  const currentUserState = useSelector(state => state.user.currentUserState);
  const location = useLocation();

  useEffect(() => {
    const getCurrentUserRequestReceived = async () => {
      try {
        await getAllPendingRequests(currentUser?._id, dispatch);
      } catch (err) {
        console.log(err.message);
      }
    }
    getCurrentUserRequestReceived();
  }, [currentUser._id, showDropDown, dispatch]);

  const toggleDropDown = () => {
    setShowDropDown(prev => !prev);
  }

  const signOutHandler = () => {
    dispatch(signOut());
    window.location.reload();
  }

  const personListViewHandler = (e) => {
    setShowPersonListDropDown(!showPersonListDropDown);
  }


  const navigationHandler = async () => {
    const profileSlug = location.pathname.split("/");
    setShowDropDown(false)
    if (profileSlug.includes('profile')) {
      profileSlug[2] = currentUser._id;
      navigate(profileSlug.join('/'));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(`/profile/${currentUser._id}`);
    }
  }

  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="logo">Social</span>
        </Link>
      </div>
      <div className="topbar-center">
        <div className="search-bar">
          <Search className='search-icon' />
          <input type="text" className="search-input" placeholder="Search for friend, post or video" />
        </div>
      </div>
      <div className="topbar-right">
        <div className="topbar-links">
          <span className="topbar-link" onClick={() => navigate('/')}>Homepage</span>
          <span className="topbar-link">Timeline</span>
        </div>
        <div className="topbar-icons">
          <div className="topbar-icon-item"  >
            <Person onClick={personListViewHandler} />
            {/* <span className="topbar-icon-badge">
              1
            </span> */}
            {showPersonListDropDown && <div className="topbar-person-view" onClick={e => e.stopPropagation()}>
              {pendingFriendRequests?.length > 0 ? pendingFriendRequests?.map(request => <RequestReceivedUserCard key={request._id} {...request} />) : <div style={{ color: 'black', fontSize: '14px', textAlign: 'center', marginTop: '10px' }}>No Pending Friend Requests</div>}
            </div>
            }
          </div>
          <div className="topbar-icon-item" disabled>
            <Chat />
            {/* <span className="topbar-icon-badge">
              1
            </span> */}
          </div>
          <div className="topbar-icon-item" disabled>
            <Notifications />
            {/* <span className="topbar-icon-badge">
              1
            </span> */}
          </div>
        </div>

        <div className="topbar-profile-img-container">
          <img src={currentUserState?.profilePicture ? `${imageUrl}/${currentUserState?.profilePicture}` : process.env.REACT_APP_PUBLIC_FOLDER + '/person/noAvatar.png'} alt="" className="topbar-img" onClick={toggleDropDown} />
          {showDropDown && <ul className="topbar-profile-img-dropdown">
            <li onClick={navigationHandler}>Profile</li>
            <li onClick={signOutHandler}>Sign Out</li>
          </ul>}
        </div>
      </div>
    </div>
  )
}
