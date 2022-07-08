import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import LocalStorage from './utils/localStorage';

const local = new LocalStorage();

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(local.getItem('user'));
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile/:userId"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
