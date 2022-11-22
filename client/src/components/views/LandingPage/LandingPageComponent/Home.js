import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [advantage, setAdvantage] = useState('');
  const [greeting, setGreeting] = useState('');

  const nagivate = useNavigate();

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
    'Good to see you again.',
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
            <button className="home__contact" data-link="#contact">
              Contact Me
            </button>
          </div>
          <h1 className="home__title">
            <span className="greeting">{greeting ? greeting : 'Welcome!'}</span>
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
