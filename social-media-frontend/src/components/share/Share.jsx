import './share.scss';
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from '@material-ui/icons'
import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { createPost, getPosts, imageUpload } from '../../apis/posts';

const url = process.env.REACT_APP_PUBLIC_FOLDER;
const imageUrl = process.env.REACT_APP_BACKEND_IMAGE_URL

export default function Share() {
  const currentUser = useSelector(state => state.auth.user);
  const currentUserState = useSelector(state => state.user.currentUserState);
  const shareRef = useRef('');

  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    const desc = shareRef.current.value;
    const newPost = { desc }
    if (file) {
      const formData = new FormData();
      const fileName = Date.now() + file.name;
      formData.append("name", fileName);
      formData.append("file", file)
      newPost.image = fileName;
      try {
        await imageUpload(formData);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await createPost(newPost, currentUser._id);
      setFile(null);
      window.location.reload();
      shareRef.current.value = '';
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="share">
      <div className="share-wrapper">
        <div className="share-top">
          <img className="share-profile-img" src={currentUserState?.profilePicture ? `${imageUrl}/${currentUserState?.profilePicture}` : url + '/person/noAvatar.png'} alt="" />
          <input type="text" className='share-input' placeholder={`What's in your mind ${currentUserState?.username}?`} ref={shareRef} />
        </div>
        <hr className="share-hr" />
        {file && (
          <div className="share-image-container">
            <img className="share-img" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="share-cancel-img" onClick={() => setFile(null)} />
          </div>
        )}
        <div className="share-bottom">
          <div className="share-options">
            <label htmlFor="file" className="share-option">
              <PermMedia htmlColor='tomato' className="share-icon" />
              <span className="share-option-text">Photo or Video</span>
              <input type="file" id="file" accept='image/*' onChange={(e) => setFile(e.target.files[0])} style={{ display: 'none' }} />
            </label>
            <div className="share-option">
              <Label className="share-icon" htmlColor='blue' />
              <span className="share-option-text">Tag</span>
            </div>
            <div className="share-option">
              <Room className="share-icon" htmlColor='green' />
              <span className="share-option-text">Location</span>
            </div>
            <div className="share-option">
              <EmojiEmotions className="share-icon" htmlColor='goldenrod' />
              <span className="share-option-text">Feelings</span>
            </div>
          </div>
          <button className='share-button' onClick={handleSubmit}>Share</button>
        </div>
      </div>
    </div>
  )
}
