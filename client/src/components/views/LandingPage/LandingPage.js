import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Auth from '../../../hoc/auth';

function LandingPage() {
  const navigate = useNavigate();

  // 로그인이 되어있으면 true 아니면 false
  const [loginOrLogout, setloginOrLogout] = useState(false);

  useEffect(() => {
    axios.get('/api/hello').then((response) => console.log(response.data));
  }, []);

  const onClickHandler = () => {
    axios.get('/api/users/logout').then((response) => {
      if (response.data.success) {
        navigate('/login');
      }
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        with: '100%',
        height: '100vh',
      }}
    >
      <h2>시작페이지</h2>
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default Auth(LandingPage, null);
