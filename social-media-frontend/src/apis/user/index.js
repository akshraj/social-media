import axios from 'axios';
import { friendFetching, friendFetcingSuccess, friendFetchingFailed, usersFetchingStart, usersFetcingSuccess, usersFetchingFailed, pendingRequestsSuccess, sendRequestResponseSuccess, getUserCurrentStateSuccess } from '../../redux/slices/userSlice'

const url = process.env.REACT_APP_BACKEND_URL;

export const getAllUsers = async (userId, dispatch) => {
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

export const sendRequest = async (id, userId, dispatch) => {
  try {
    const response = await axios.put(`${url}/users/${id}/send-request`, {
      userId
    });
    dispatch(sendRequestResponseSuccess(response.data))
  } catch (err) {
    console.log(err.message);
  }
}

export const getAllPendingRequests = async (userId, dispatch) => {
  try {
    const response = await axios.get(`${url}/users/${userId}/pending-requests`);
    dispatch(pendingRequestsSuccess(response?.data))
    return response;
  } catch (err) {
    console.log(err.message)
  }
}

export const getUser = async (userId, dispatch) => {
  try {
    const response = await axios.get(`${url}/users/${userId}`);
    dispatch(getUserCurrentStateSuccess(response.data))
  } catch (err) {
    console.log(err);
  }
}

export const editUser = async (userId, body) => {
  try {
    const response = await axios.put(`${url}/users/${userId}`, {
      ...body
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}

