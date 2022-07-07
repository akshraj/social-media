import './online.scss';

export default function Online({ profilePicture, username }) {
  return (
    <li className="rightbar-friend">
      <div className="rightbar-profile-img-container">
        <img className="rightbar-profile-img" src={`${process.env.REACT_APP_PUBLIC_FOLDER}/${profilePicture}`} alt="" />
        <span className="rightbar-online"></span>
      </div>
      <span className="rightbar-username">{username}</span>
    </li>
  )
}
