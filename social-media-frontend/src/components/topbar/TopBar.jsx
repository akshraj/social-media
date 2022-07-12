import './topbar.scss'
import { Link, useNavigate } from 'react-router-dom';
import { Search, Person, Chat, Notifications } from '@material-ui/icons'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { signOut } from '../../redux/slices/authSlice'
import RequestReceivedUserCard from '../requestReceivedUserCard/RequestReceivedUserCard';
import { getAllPendingRequests } from '../../apis/user';


export default function TopBar() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showPersonListDropDown, setShowPersonListDropDown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.auth.user);
  const pendingFriendRequests = useSelector(state => state.user.pendingRequests);

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
          <span className="topbar-link">Homepage</span>
          <span className="topbar-link">Timeline</span>
        </div>
        <div className="topbar-icons">
          <div className="topbar-icon-item"  >
            <Person onClick={personListViewHandler} />
            <span className="topbar-icon-badge">
              1
            </span>
            {showPersonListDropDown && <div className="topbar-person-view" onClick={e => e.stopPropagation()}>
              {pendingFriendRequests?.length > 0 ? pendingFriendRequests?.map(request => <RequestReceivedUserCard key={request._id} {...request} />) : <div style={{ color: 'black', fontSize: '14px', textAlign: 'center', marginTop: '10px' }}>No Pending Friend Requests</div>}
            </div>
            }
          </div>
          <div className="topbar-icon-item">
            <Chat />
            <span className="topbar-icon-badge">
              1
            </span>
          </div>
          <div className="topbar-icon-item">
            <Notifications />
            <span className="topbar-icon-badge">
              1
            </span>
          </div>
        </div>

        <div className="topbar-profile-img-container">
          <img src={currentUser?.profilePicture ? currentUser.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + '/person/noAvatar.png'} alt="" className="topbar-img" onClick={toggleDropDown} />
          {showDropDown && <ul className="topbar-profile-img-dropdown">
            <li onClick={() => navigate(`/profile/${currentUser?._id}`)}>Profile</li>
            <li onClick={signOutHandler}>Sign Out</li>
          </ul>}
        </div>
      </div>
    </div>
  )
}
