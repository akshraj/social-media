import axios from 'axios';
import { loginStart, loginSuccess, loginError } from '../../redux/slices/authSlice'
import LocalStorage from '../../utils/localStorage'

const url = process.env.REACT_APP_BACKEND_URL;

const local = new LocalStorage();
export const login = async (userCreds, dispatch) => {

  dispatch(loginStart());
  try {
    const response = await axios.post(`${url}/auth/login`, userCreds);
    local.setItem('user', JSON.stringify(response.data));
    dispatch(loginSuccess(response.data));
  } catch (err) {
    dispatch(loginError(err.message));
  }
}