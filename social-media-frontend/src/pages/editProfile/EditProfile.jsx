import { useState, useEffect } from 'react';
import { imageUpload } from '../../apis/posts';
import { editUser, getUser } from '../../apis/user';
import { useDispatch, useSelector } from 'react-redux'
import './editProfile.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const imgUrl = process.env.REACT_APP_BACKEND_IMAGE_URL;
const url = process.env.REACT_APP_BACKEND_URL;

export default function EditProfile() {
  const currentUser = useSelector(state => state.auth.user);
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);
  const [userName, setUserName] = useState();
  const [descState, setDescState] = useState();
  const [cityState, setCityState] = useState();
  const [firstTimeEditing, setFirstTimeEditing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserAsync = async () => {
      try {
        const res = await axios.get(`${url}/users/${currentUser?._id}`);
        const { username, desc, city, profilePicture } = res.data;
        if (!profilePicture) {
          setFirstTimeEditing(true);
        }
        setUserName(username)
        setDescState(desc);
        setCityState(city);
        setImageUrl(profilePicture ? `${imgUrl}/${profilePicture}` : '');
      } catch (err) {
        console.log(err);
      }
    }
    getUserAsync();
  }, [dispatch, currentUser?._id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newData = {
      username: userName,
      desc: descState,
      city: cityState,
      userId: currentUser?._id
    }

    if (firstTimeEditing) {
      newData.firstTime = firstTimeEditing;
    }

    if (file) {
      const formData = new FormData();
      const fileName = Date.now() + file.name;
      formData.append('name', fileName);
      formData.append('file', file);
      newData.profilePicture = fileName;
      try {
        await imageUpload(formData);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await editUser(currentUser?._id, newData);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
    imageUrlCreate(file);
  }

  const imageUrlCreate = (file) => {
    const imageURI = URL.createObjectURL(file);
    setImageUrl(imageURI);
  }


  return (
    <div className="editProfile-wrapper">
      <div className="profile-container">
        <div className="profile-img-container">
          <img src={imageUrl} alt="" />
        </div>
        <div className="profile-file-container">
          <label htmlFor="file">Upload Image</label>
          <input type="file" id="file" onChange={handleImageUpload} accept="image/*" />
        </div>
      </div>
      <div className="profile-input-container">
        <div className="profile-input">
          <label htmlFor="username">User Name</label>
          <input type="text" id="username" placeholder="Username" name="username" value={userName} onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className="profile-input">
          <label htmlFor="desc">Description</label>
          <input type="text" id="desc" placeholder="Description" name="desc" value={descState} onChange={(e) => setDescState(e.target.value)} />
        </div>
        <div className="profile-input">
          <label htmlFor="city">City</label>
          <input type="text" id="city" placeholder="city" name="city" value={cityState} onChange={(e) => setCityState(e.target.value)} />
        </div>
        <button onClick={submitHandler} className="edit-button">Submit</button>
      </div>
    </div>
  )
}
