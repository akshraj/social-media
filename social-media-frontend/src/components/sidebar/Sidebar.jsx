import './Sidebar.scss'
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from '@material-ui/icons'
import CloseFriend from '../closeFriend/CloseFriend'
import { Users } from '../../dummyData';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getFriends } from '../../apis/user';

export default function Sidebar() {
  const user = useSelector(state => state.auth.user);
  const friends = useSelector(state => state.user.friends);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        await getFriends(user._id, dispatch);
      } catch (err) {
        console.log(err)
      }
    }
    fetchFriends()
  }, [user._id, dispatch]);

  console.log(friends)


  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <ul className="sidebar-list">
          <li className="sidebar-list-item">
            <RssFeed className="sidebar-icon" />
            <span className="sidebar-list-item-text">Feed</span>
          </li>
          <li className="sidebar-list-item">
            <Chat className="sidebar-icon" />
            <span className="sidebar-list-item-text">Chats</span>
          </li>
          <li className="sidebar-list-item">
            <PlayCircleFilledOutlined className="sidebar-icon" />
            <span className="sidebar-list-item-text">Videos</span>
          </li>
          <li className="sidebar-list-item">
            <Group className="sidebar-icon" />
            <span className="sidebar-list-item-text">Groups</span>
          </li>
          <li className="sidebar-list-item">
            <Bookmark className="sidebar-icon" />
            <span className="sidebar-list-item-text">Bookmarks</span>
          </li>
          <li className="sidebar-list-item">
            <HelpOutline className="sidebar-icon" />
            <span className="sidebar-list-item-text">Questions</span>
          </li>
          <li className="sidebar-list-item">
            <WorkOutline className="sidebar-icon" />
            <span className="sidebar-list-item-text">Jobs</span>
          </li>
          <li className="sidebar-list-item">
            <Event className="sidebar-icon" />
            <span className="sidebar-list-item-text">Events</span>
          </li>
          <li className="sidebar-list-item">
            <School className="sidebar-icon" />
            <span className="sidebar-list-item-text">Courses</span>
          </li>
        </ul>
        <button className='sidebar-button'>
          Show More
        </button>
        <hr className='sidebar-hr' />
        <ul className="sidebar-friend-list">
          {friends && friends.map(friend => <CloseFriend {...friend} key={friend._id} />)}
        </ul>
      </div>
    </div>
  )
}
