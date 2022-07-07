import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
