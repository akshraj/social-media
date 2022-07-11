import './requestReceivedUserCard.scss'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { getAllPendingRequests } from '../../apis/user';

export default function RequestReceivedUserCard({ _id, username, profilePicture }) {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const requestAcceptHandler = async () => {
    try {
      await axios.put(`http://localhost:8800/api/users/${_id}/pending-request-actions`, {
        userId: user?._id,
        status: 1
      })
      await getAllPendingRequests(user?._id, dispatch);
    } catch (err) {
      console.log(err.message);
    }
  }

  const requestRejectHandler = async () => {
    try {
      await axios.put(`http://localhost:8800/api/users/${_id}/pending-request-actions`, {
        userId: user?._id,
        status: 2
      })
      await getAllPendingRequests(user?._id, dispatch);
    } catch (err) {
      console.log(err.message)
    }
  }

  const Actions = () => {
    return <><button onClick={requestAcceptHandler}>Confirm</button>
      <button onClick={requestRejectHandler}>Reject</button>
    </>
  }

  return (
    <div className="card-wrapper">
      <div className="card-img-container">
        <img src={profilePicture ? process.env.REACT_APP_BACKEND_IMAGE_URL + profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + '/person/noAvatar.png'} alt="" />
      </div>
      <div className="card-info-container">
        <span className="request-user-name">{username}</span>
        <div className="button-container">
          <Actions />
        </div>
      </div>
    </div>
  )
}
