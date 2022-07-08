import { useEffect, useRef } from 'react';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import TopBar from '../../components/topbar/TopBar';
import './home.scss';

export default function Home() {
  let isMountedRef = useRef(false);
  useEffect(() => {
    isMountedRef.current = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => {
      isMountedRef.current = false
    }
  }, []);

  return (
    <>
      <TopBar />
      <div className="home-container">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  )
}
