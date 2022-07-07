import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import TopBar from '../../components/topbar/TopBar';
import './profile.scss';

export default function Profile() {
  return (
    <>
      <TopBar />
      <div className="profile">
        <Sidebar />

        <div className="profile-right">
          <div className="profile-right-top">
            <div className="profile-cover">
              <img className="profile-cover-img" src="/assets/post/3.jpeg" alt="" />
              <img className="profile-user-img" src="/assets/person/7.jpeg" alt="" />
            </div>
            <div className="profile-info">
              <h4 className="profile-info-name">Akshay Raj</h4>
              <span className="profile-info-desc">Hello my friend</span>
            </div>
          </div>
          <div className="profile-right-bottom">
            <Feed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  )
}
