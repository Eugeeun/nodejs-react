import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithubSquare,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

function Contact() {
  return (
    <section id="contact" className="section">
      <h1 className="contact__title">Contact Me</h1>
      <ul className="contact__infos">
        <li>
          <h2 className="contact__email">jack603@naver.com</h2>
        </li>
        <li>
          <h2 className="contact__email">gojongwon8292@gmail.com</h2>
        </li>
        <li>
          <h2 className="contact__tel">010-9447-1363</h2>
        </li>
      </ul>
      <div className="contact__links">
        <a href="https://github.com/Eugeeun" target="blank">
          <FontAwesomeIcon
            icon={faGithubSquare}
            className="fab fa-github-square contact__link"
          />
        </a>
        <a
          href="https://www.instagram.com/colored_pencils99.11.22/"
          target="blank"
        >
          <FontAwesomeIcon
            icon={faInstagram}
            className="fa-brands fa-instagram contact__link"
          />
        </a>
      </div>
      <p className="contact__rights">
        Copyright 2022. JongWon. All rights reserved.
      </p>
    </section>
  );
}

export default Contact;
