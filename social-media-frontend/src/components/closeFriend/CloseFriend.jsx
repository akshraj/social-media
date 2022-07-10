import './closeFriend.scss'

export default function CloseFriend({ username, profilePicture }) {
  return (
    <li className="sidebar-friend">
      <img className="sidebar-friend-img" src={profilePicture ? `${process.env.REACT_APP_BACKEND_IMAGE_URL}/${profilePicture}` : `${process.env.REACT_APP_PUBLIC_FOLDER}/person/noAvatar.png`} alt="" />
      <span className="sidebar-friend-name">{username}</span>
    </li>
  )
}
