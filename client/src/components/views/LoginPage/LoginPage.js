import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth';
import './css/loginPage.css';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const body = {
      email: Email,
      password: Password,
    };

    // 자 이제 뭔가 액션을 할 건데
    // 액션은 로그인이야 바디 오브젝트를 가지고 loginUser 함수를 실행해줘
    dispatch(loginUser(body)).then((response) => {
      // 성공하면
      if (response.payload.loginSuccess) {
        // 시작페이지로 이동시켜줘
        navigate('/');
      }
    });
  };

  const toRegistePage = () => {
    navigate('/register');
  };

  return (
    <div className="loginPage">
      <div className="loginBox">
        <h2>Login</h2>
        <form className="loginForm" onSubmit={onSubmitHandler}>
          <div className="inputBox">
            <span>Email</span>
            <input type="email" value={Email} onChange={onEmailHandler} />
          </div>
          <div className="inputBox">
            <span>Password</span>
            <input
              type="password"
              value={Password}
              onChange={onPasswordHandler}
            />
          </div>
          <br />
          <button type="submit" className="loginBtn">
            Login
          </button>
        </form>
        <button className="registerBtn" onClick={toRegistePage}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Auth(LoginPage, false);
