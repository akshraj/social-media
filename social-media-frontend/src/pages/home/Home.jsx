import { Fragment, useEffect, useRef } from 'react';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import TopBar from '../../components/topbar/TopBar';
import './home.scss';
import { useSelector } from 'react-redux';
import EditPost from '../../components/editPost/EditPost';

export default function Home() {
  let isMountedRef = useRef(false);
  const showEdit = useSelector(state => state.post.showEdit);
  useEffect(() => {
    isMountedRef.current = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => {
      isMountedRef.current = false
    }
  }, []);

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
