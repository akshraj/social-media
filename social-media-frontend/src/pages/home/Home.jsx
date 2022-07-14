import { useEffect, useRef } from 'react';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import TopBar from '../../components/topbar/TopBar';
import './home.scss';
import { useSelector, useDispatch } from 'react-redux';
import EditPost from '../../components/editPost/EditPost';
import { getUser } from '../../apis/user';

export default function Home() {
  let isMountedRef = useRef(false);
  const currentUser = useSelector(state => state.auth.user);
  const showEdit = useSelector(state => state.post.showEdit);
  const dispatch = useDispatch();
  useEffect(() => {
    isMountedRef.current = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => {
      isMountedRef.current = false
    }
  }, []);

  useEffect(() => {
    const getUserAsync = async () => {
      try {
        await getUser(currentUser?._id, dispatch);
      } catch (err) {
        console.log(err)
      }
    }
    getUserAsync();
  }, [currentUser?._id, dispatch])

  return (
    <>
      {showEdit && <EditPost />}
      <TopBar />
      <div className="home-container">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  )
}
