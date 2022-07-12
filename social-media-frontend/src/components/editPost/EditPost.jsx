import './editPost.scss';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { showEditModal } from '../../redux/slices/postSlice';
import { editPost, getPosts } from '../../apis/posts';
import { Close } from '@material-ui/icons';
import Spinner from '../spinner/Spinner'

export default function EditPost() {
  const currentUser = useSelector(state => state.auth.user);
  const { showEdit, postIdToEdit, postDescToEdit } = useSelector(state => state.post);
  const [inputValue, setInputValue] = useState(postDescToEdit);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = showEdit ? 'hidden' : 'auto';
  }, [showEdit])

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowSuccessMessage(false);
    await editPost(postIdToEdit, currentUser?._id, inputValue);
    await getPosts({ userId: currentUser?._id, dispatch });
    setShowSuccessMessage(true);
    setIsLoading(false);
  }

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }


  return ReactDOM.createPortal(
    <div className="edit-post-container">
      <form action="" onSubmit={submitHandler}>
        {showSuccessMessage && <p style={{ backgroundColor: '#d5a6bd', padding: '10px', 'margin-bottom': '10px', borderRadius: '5px', 'font-weight': '500', color: 'white' }}>The Post has been updated</p>}
        <div className="input-container">
          <textarea rows="10" placeholder="description" value={inputValue} onChange={handleChange} />
        </div>
        <button>{isLoading ? <Spinner /> : 'Submit'}</button>
        <div className="close-modal-button" onClick={() => dispatch(showEditModal(false))}>
          <Close />
        </div>
      </form>
    </div >, document.body)
}
