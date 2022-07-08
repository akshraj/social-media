import './rightbar.scss';
import { Users } from '../../dummyData'
import Online from '../online/Online';

export default function Rightbar({ user }) {

  const relationship = () => {
    switch (user?.relationship) {
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
      <h4 className="rightbar-title">Online Friends</h4>
      <ul className="rightbar-friend-list">
        {Users.map(user => <Online {...user} key={user.id} />)}
      </ul>
    </>
  }

  const ProfileRightBar = () => {
    return <>
      <h4 className="rightbar-title">User Information</h4>
      <div className="rightbar-info">
        <div className="rightbar-info-item">
          <span className="rightbar-info-key">City:</span>
          <span className="rightbar-info-value">{user?.city}</span>
        </div>
        <div className="rightbar-info-item">
          <span className="rightbar-info-key">From:</span>
          <span className="rightbar-info-value">{user?.from}</span>
        </div>
        <div className="rightbar-info-item">
          <span className="rightbar-info-key">Relationship:</span>
          <span className="rightbar-info-value">{relationship()}</span>
        </div>
      </div>
      <h4 className="rightbar-title">User friends</h4>
      <div className="rightbar-followings">
        <div className="rightbar-following">
          <img className="rightbar-following-img" src={`${process.env.REACT_APP_PUBLIC_FOLDER}/person/1.jpeg`} alt="" />
          <span className="rightbar-following-name">John Carter</span>
        </div>
      </div>
    </>
  }
  return (
    <div className="rightbar">
      <div className="rightbar-wrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  )
}
