import axios from 'axios';

const url = process.env.REACT_APP_BACKEND_URL

export const getPosts = async (userId, profile = false) => {
  let slug = 'timeline/';
  if (profile) slug = 'profile/';
  const response = await axios.get(`${url}/posts/${slug}${userId}`);
  return response;
}