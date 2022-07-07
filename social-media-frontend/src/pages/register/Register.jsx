import './register.scss';
import { useNavigate } from "react-router-dom";

export default function Register() {
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
            <input type="text" className="login-input" placeholder="Username" />
            <input type="email" className="login-input" placeholder="Email" />
            <input type="password" className="login-input" placeholder="Password" />
            <input type="password" className="login-input" placeholder="Confirm Password" />
            <button className="login-button">Register</button>
            <span className="login-forgot">Forgot Password?</span>
            <div className="login-register-button" onClick={() => navigate("/login", { replace: true })}>Log into your Account</div>
          </div>
        </div>
      </div>
    </div>
  )
}
