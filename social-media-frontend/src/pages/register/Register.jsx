import './register.scss';
import { useNavigate } from "react-router-dom";
import { useRef, useState } from 'react';
import { register } from '../../apis/auth';
import { useDispatch } from 'react-redux';


export default function Register() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userNameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const confirmPasswordRef = useRef('');

  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const registerHandler = async (e) => {
    e.preventDefault();
    const username = userNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    const creds = {
      username,
      email,
      password
    }

    try {
      if (username === '' || email === '' || password === '' || confirmPassword === '') {
        throw new Error('Please fill out all the fields')
      }
      if (confirmPassword !== password) {
        throw new Error('passwords are not equal');
      }

      await register(creds, dispatch);
      navigate('/login');

    } catch (err) {
      setError(true);
      setErrorMessage(err.message)
    }

  }

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
          <form className="login-box" onSubmit={registerHandler}>
            <input type="text" className="login-input" placeholder="Username" ref={userNameRef} />
            <input type="email" className="login-input" placeholder="Email" ref={emailRef} />
            <input type="password" className="login-input" placeholder="Password" ref={passwordRef} />
            <input type="password" className="login-input" placeholder="Confirm Password" ref={confirmPasswordRef} />
            {error && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button className="login-button">Register</button>
            <span className="login-forgot">Forgot Password?</span>
            <div className="login-register-button" onClick={() => navigate("/login", { replace: true })}>Log into your Account</div>
          </form>
        </div>
      </div>
    </div>
  )
}
