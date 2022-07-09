import axios from 'axios';
import { postFetchStart, postFetchSuccess, postFetchFailed } from '../../redux/slices/postSlice';

const url = process.env.REACT_APP_BACKEND_URL

export const getPosts = async ({ userId, profile = false, dispatch }) => {
  let slug = 'timeline/';
  if (profile) slug = 'profile/';
  dispatch(postFetchStart());
  try {
    const response = await axios.get(`${url}/posts/${slug}${userId}`);
    dispatch(postFetchSuccess(response.data))
  } catch (err) {
    dispatch(postFetchFailed(err.message))
  }
}

export const likePost = async (postId, userId) => {
  try {
    const response = await axios.put(`${url}/posts/${postId}/like`, {
      userId
    });
    console.log(response.data);
  } catch (err) {
    console.log(err.message)
  }
}

export const imageUpload = async (formData) => {
  try {
    await axios.post(`${url}/upload`, formData);
  } catch (err) {
    console.log(err.message)
  }
}

export const createPost = async (post, userId) => {
  try {
    await axios.post(`${url}/posts`, {
      userId,
      ...post
    });
  } catch (err) {
    console.log(err.message)
  }
}