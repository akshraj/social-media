import axios from 'axios';
import { loginStart, loginSuccess, loginError, registerStart, registerSuccess, registerError } from '../../redux/slices/authSlice';

const url = process.env.REACT_APP_BACKEND_URL;

export const login = async (userCreds, dispatch) => {

  dispatch(loginStart());
  try {
    const response = await axios.post(`${url}/auth/login`, userCreds);
    localStorage.setItem('user', JSON.stringify(response.data));
    dispatch(loginSuccess(response.data));
  } catch (err) {
    dispatch(loginError(err.message));
  }
}

export const register = async (userCreds, dispatch) => {
  dispatch(registerStart());
  try {
    await axios.post(`${url}/auth/register`, userCreds);
    dispatch(registerSuccess());
  } catch (err) {
    dispatch(registerError(err.message));
  }
}