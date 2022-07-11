import './rightbar.scss';
import FriendSuggestion from '../friendSuggestion/friendSuggestion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, getFriends } from '../../apis/user';

export default function Rightbar({ profileUser }) {
  const dispatch = useDispatch();
  const friends = useSelector(state => state.user.friends);
  const users = useSelector(state => state.user.users);
  const { user } = useSelector(state => state.auth);


  useEffect(() => {
    const fetchFriends = async () => {
      try {
        await getFriends(user?._id, dispatch)
        await getAllUsers(user?._id, dispatch)
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchFriends();

  }, [user?._id, dispatch]);


  const relationship = () => {
    switch (profileUser?.relationship) {
      case 1:
        return "It's complicated"
      case 2:
        return 'Married'
      case 3:
        return 'Widowed'
      default:
        return 'Single'
    }
  }

  const HomeRightBar = () => {
    return <>
      <div className="birthday-container">
        <img className='birthday-img' src="/assets/gift.png" alt="" />
        <span className="birthday-text"><b>John Doe</b> and <b>3 other friends</b> have their birthday today</span>
      </div>
      <img className='rightbar-ad' src="/assets/ad.png" alt="" />
      {users?.length > 0 && <><h4 className="rightbar-title">Friend Suggestions</h4>
        <ul className="rightbar-friend-suggestion-list">
          {users?.map(user => <FriendSuggestion {...user} key={user._id} />)}
        </ul>
      </>}
    </>
  }

  const ProfileRightBar = () => {
    return <>
      <h4 className="rightbar-title">User Information</h4>
      <div className="rightbar-info">
        <div className="rightbar-info-item">
          <span className="rightbar-info-key">City:</span>
          <span className="rightbar-info-value">{profileUser?.city}</span>
        </div>
        <div className="rightbar-info-item">
          <span className="rightbar-info-key">From:</span>
          <span className="rightbar-info-value">{profileUser?.from}</span>
        </div>
        <div className="rightbar-info-item">
          <span className="rightbar-info-key">Relationship:</span>
          <span className="rightbar-info-value">{relationship()}</span>
        </div>
      </div>
      {friends?.length > 0 && <><h4 className="rightbar-title">User friends</h4>
        <ul className="rightbar-friend-suggestion-list">
          {friends?.map(user => <FriendSuggestion {...user} key={user._id} profile />)}
        </ul>
      </>
      }
    </>
  }
  return (
    <div className="rightbar">
      <div className="rightbar-wrapper">
        {profileUser ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  )
}
