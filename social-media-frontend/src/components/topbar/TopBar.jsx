import { Link, useNavigate } from 'react-router-dom';

import './topbar.scss'
import { Search, Person, Chat, Notifications } from '@material-ui/icons'

export default function TopBar() {
  const navigate = useNavigate();
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
          <div className="topbar-icon-item">
            <Person />
            <span className="topbar-icon-badge">
              1
            </span>
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
        <img src="/assets/person/1.jpeg" alt="" className="topbar-img" onClick={() => navigate("/profile/akshay-raj")} />
      </div>
    </div>
  )
}
