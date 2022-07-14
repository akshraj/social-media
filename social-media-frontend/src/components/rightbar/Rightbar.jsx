import './rightbar.scss';
import FriendSuggestion from '../friendSuggestion/friendSuggestion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, getFriends } from '../../apis/user';
import { Edit } from '@material-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';

export default function Rightbar({ profileUser }) {
  const dispatch = useDispatch();
  const friends = useSelector(state => state.user.friends);
  const users = useSelector(state => state.user.users);
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        await getFriends(userId, dispatch)
        await getAllUsers(user?._id, dispatch)
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchFriends();

  }, [user?._id, dispatch, userId]);

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
      <div className="right-edit-button-container">
        <h4 className="rightbar-title">User Information</h4>
        {user?._id === userId && <button onClick={() => navigate(`edit`)}>Edit Profile <Edit className="right-edit-button-icon" /></button>}
      </div>
      <div className="rightbar-info">
        <div className="rightbar-info-item">
          <span className="rightbar-info-key">City:</span>
          <span className="rightbar-info-value">{profileUser?.city || '-'}</span>
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
