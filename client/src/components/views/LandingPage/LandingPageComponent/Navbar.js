import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [clock, setClock] = useState('');
  const clockRef = useRef(0);

  const getClock = () => {
    const date = new Date(); // Date라는 클래스 생성! 자바 때 배운거랑 똑같음
    const hours = String(date.getHours()).padStart(2, '0'); // 1시면 표시를 01시 이렇게 하기 위해 한 것임
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`; // .clock의 텍스트로 시간을 넣어줌
  };

  useEffect(() => {
    setInterval(() => {
      clockRef.current = getClock();
      setClock(clockRef.current);
    }, 1000);
  }, []);

  return (
    <nav id="navbar">
      <div className="navbar__logo">
        <span className="clock">{clock ? clock : getClock()}</span>
        <a href="#">What JongWon's Work!</a>
      </div>
      <ul className="navbar__menu">
        <li className="navbar__menu__item active" data-link="#home">
          Home
        </li>
        <li className="navbar__menu__item" data-link="#about">
          About
        </li>
        <li className="navbar__menu__item" data-link="#skills">
          Skills
        </li>
        <li className="navbar__menu__item" data-link="#work">
          My Work
        </li>
        <li className="navbar__menu__item" data-link="#contact">
          Contact
        </li>
      </ul>

      <button className="navbar__toggle-btn">
        <FontAwesomeIcon icon={faHamburger} className="fas fa-hamburger" />
      </button>
    </nav>
  );
}

export default Navbar;
