import './closeFriend.scss'

export default function CloseFriend({ username, profilePicture }) {
  return (
    <li className="sidebar-friend">
      <img className="sidebar-friend-img" src={`${process.env.REACT_APP_PUBLIC_FOLDER}/${profilePicture}`} alt="" />
      <span className="sidebar-friend-name">{username}</span>
    </li>
  )
}
