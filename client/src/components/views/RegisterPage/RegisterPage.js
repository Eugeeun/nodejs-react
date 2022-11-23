import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth';
import './css/registerPage.css';

function RegisterPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Name, setName] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const onNamedHandler = (event) => {
    setName(event.target.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }

    const body = {
      email: Email,
      password: Password,
      name: Name,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        navigate('/login');
      }
    });
  };

  return (
    <div className="registerPage">
      <div className="registerBox">
        <h2>Register</h2>
        <form className="registerForm" onSubmit={onSubmitHandler}>
          <div className="inputBox">
            <span>Email</span>
            <input type="email" value={Email} onChange={onEmailHandler} />
          </div>
          <div className="inputBox">
            <span>Name</span>
            <input type="text" value={Name} onChange={onNamedHandler} />
          </div>
          <div className="inputBox">
            <span>Password</span>
            <input
              type="password"
              value={Password}
              onChange={onPasswordHandler}
            />
          </div>
          <div className="inputBox">
            <span>Password</span>
            <input
              type="password"
              value={ConfirmPassword}
              placeholder="Input your password again"
              onChange={onConfirmPasswordHandler}
            />
          </div>
          <button className="registerPage__Btn" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth(RegisterPage, false);
