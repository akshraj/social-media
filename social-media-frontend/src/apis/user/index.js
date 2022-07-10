import axios from 'axios';
import { friendFetching, friendFetcingSuccess, friendFetchingFailed, usersFetchingStart, usersFetcingSuccess, usersFetchingFailed } from '../../redux/slices/userSlice'

const url = process.env.REACT_APP_BACKEND_URL;

export const getAllUsers = async (userId, dispatch) => {
  console.log('all-users', userId);
  try {
    dispatch(usersFetchingStart());
    const response = await axios.get(`${url}/users/${userId}/all`);
    dispatch(usersFetcingSuccess(response.data));
  } catch (err) {
    dispatch(usersFetchingFailed(err.message))
  }
}

export const getFriends = async (userId, dispatch) => {
  try {
    dispatch(friendFetching());
    const response = await axios.get(`${url}/users/${userId}/friends`);
    dispatch(friendFetcingSuccess(response.data));
  } catch (err) {
    dispatch(friendFetchingFailed(err.message))
  }
}
