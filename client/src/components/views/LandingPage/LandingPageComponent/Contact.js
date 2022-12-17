import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithubSquare,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

function Contact() {
  const links = [faGithubSquare, faInstagram];
  const [contact, setContact] = useState([]);
  const [link, setLink] = useState([]);

  useEffect(() => {
    axios.get('/api/contact').then((response) => setContact(response.data));
    axios.get('/api/link').then((response) => setLink(response.data));
  }, []);

  return (
    <section id="contact" className="section">
      <h1 className="contact__title">Contact Me</h1>
      <ul className="contact__infos">
        {contact.map((contact, index) => (
          <li key={index}>
            <h2 className={contact.className}>{contact.content}</h2>
          </li>
        ))}
      </ul>
      <div className="contact__links">
        {link.map((link, index) => (
          <a href={link.link} target="blank" key={index}>
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
