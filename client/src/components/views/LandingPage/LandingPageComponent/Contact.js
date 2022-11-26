import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithubSquare,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import myData from '../data/myinfo.json';

function Contact() {
  const links = [faGithubSquare, faInstagram];

  return (
    <section id="contact" className="section">
      <h1 className="contact__title">Contact Me</h1>
      <ul className="contact__infos">
        {myData.contacts.map((contact, index) => (
          <li key={index}>
            <h2 className={contact.className}>{contact.content}</h2>
          </li>
        ))}
      </ul>
      <div className="contact__links">
        {myData.links.map((link, index) => (
          <a href={link.link} target="blank">
            <FontAwesomeIcon icon={links[index]} className={link.className} />
          </a>
        ))}
      </div>
      <p className="contact__rights">
        Copyright 2022. JongWon. All rights reserved.
      </p>
    </section>
  );
}

export default Contact;
