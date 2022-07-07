import { useNavigate } from 'react-router-dom';
import './login.scss';

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-left">
          <h3 className="login-logo">Social</h3>
          <span className="login-desc">
            Connect with friends and the world around you on Social.
          </span>
        </div>
        <div className="login-right">
          <div className="login-box">
            <input type="email" className="login-input" placeholder="Email" />
            <input type="password" className="login-input" placeholder="Password" />
            <button className="login-button">Login</button>
            <span className="login-forgot">Forgot Password?</span>
            <div className="login-register-button" onClick={() => navigate("/register", { replace: true })}>Create a New Account</div>
          </div>
        </div>
      </div>
    </div>
  )
}
