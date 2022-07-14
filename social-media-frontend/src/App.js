import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import EditProfile from './pages/editProfile/EditProfile';

function App() {
  const user = useSelector(state => state.auth.user);
  return (
    <Routes>
      <Route path="/login" element={
        !user ? <Login /> : <Navigate to="/" replace />
      } />
      <Route path="/register" element={
        !user ? <Register /> : <Navigate to="/" replace />
      } />

      <Route path="profile/:userId" element={
        user ? <Profile /> : <Navigate to="/login" replace />
      } />

      <Route path="profile/:userId/edit" element={user ? <EditProfile /> : <Navigate to="/login" replace />} />

      <Route path="/" element={
        user ? <Home /> : <Navigate to="/login" replace />
      } />
    </Routes>
  );
}

export default App;
