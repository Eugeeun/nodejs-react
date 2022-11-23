import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth } from '../../../../_actions/user_action';
import axios from 'axios';

function Home() {
  const [advantage, setAdvantage] = useState('');
  const [greeting, setGreeting] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const myAdvantages = [
    '큰 그림을 보는 것을 잘합니다.',
    '분석적인 시야를 갖고 있습니다.',
    '토론과 논쟁을 즐깁니다.',
    '자기 객관화를 꾸준히 합니다.',
    '잘 웃습니다.',
    '말을 끝까지 경청합니다.',
  ];
  const setMyAdvantage = (event) => {
    setAdvantage(
      `장점들: ${myAdvantages[Math.floor(Math.random() * myAdvantages.length)]}`
    );
  };

  const greetingMessages = [
    '안녕하세요!',
    '환영합니다!',
    'Welcome back!',
    'Hello!',
    "How's it going?",
    "What's up?",
    'Good to see you.',
    "It's been a while.",
    '어서오세요!',
    '오랜만입니다.',
  ];

  useEffect(() => {
    setGreeting(
      greetingMessages[Math.floor(Math.random() * greetingMessages.length)]
    );
  }, []);

  useEffect(() => {
    const backgroundImgCnt = 5;
    const chosenImg = Math.floor(Math.random() * backgroundImgCnt) + 1;

    document.getElementById(
      'home'
    ).style.backgroundImage = `url(imgs/backgrounds/background${chosenImg}.jpg)`;
  }, []);

  const dispatchAuth = () => {
    dispatch(auth()).then((response) => {
      if (response.payload.isAuth) {
        setLoggedInUser(response.payload.name);
        setIsLoggedIn(true);
      }
    });
  };

  useEffect(() => dispatchAuth());

  // 버튼이 클릭되면
  const onLogOutClickHandler = () => {
    // 요 주소로가서 결과를 얻어와
    axios.get('/api/users/logout').then((response) => {
      // 결과가 성공이면
      if (response.data.success) {
        // 요 주소로 이동해줘
        setIsLoggedIn(false);
        setLoggedInUser(null);
        dispatchAuth();
        navigate('/');
      }
    });
  };

  const onLogInClickHandler = () => navigate('/login');

  return (
    <section id="home">
      <div className="home__container">
        <div className="profileAndGreeting">
          <div className="imgAndBtn">
            <img
              src="imgs/profile.jpg"
              alt="profile img"
              className="home__avartar"
            />
            {isLoggedIn ? (
              <button
                className="home__contact logout"
                onClick={onLogOutClickHandler}
              >
                Log Out
              </button>
            ) : (
              <button
                className="home__contact login"
                onClick={onLogInClickHandler}
              >
                Log In
              </button>
            )}
          </div>
          <h1 className="home__title">
            <span className="greeting">
              {loggedInUser ? `${loggedInUser}, ` : null}
              {greeting ? greeting : 'Welcome!'}
            </span>
            -고종원의 포트폴리오-
          </h1>
        </div>
        <h2 className="home__description" onClick={setMyAdvantage}>
          {advantage ? advantage : 'Click and show my advantages!'}
        </h2>
      </div>
    </section>
  );
}

export default Home;
