import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import './login.scss';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../apis/auth';
import Spinner from '../../components/spinner/Spinner';

export default function Login() {
  const navigate = useNavigate();
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.auth);


  const handleLogin = async (e) => {
    e.preventDefault();
    const emailVal = emailRef.current.value;
    const passwordVal = passwordRef.current.value;
    try {
      if (emailVal === '' || passwordVal === '') {
        throw new Error('Please fill out email and password!')
      }
      await login({ email: emailVal, password: passwordVal }, dispatch);
    } catch (err) {
      setError(true);
      setErrorMessage(err.message);
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
          <div className="login-box">
            <input type="email" className="login-input" placeholder="Email" ref={emailRef} onFocus={() => setError(false)} />
            <input type="password" className="login-input" placeholder="Password" ref={passwordRef} onFocus={() => setError(false)} required min={6} autoComplete="true" />
            <button className='login-button' disabled={isFetching} onClick={handleLogin}>{isFetching ? <Spinner /> : 'Login'}</button>
            {error && <p style={{ color: 'red', fontWeight: 400, textAlign: 'center' }}>{errorMessage}</p>}
            <span className="login-forgot">Forgot Password?</span>
            <div className="login-register-button" onClick={() => navigate("/register", { replace: true })}>Create a New Account</div>
          </div>
        </div>
      </div>
    </div>
  )
}
