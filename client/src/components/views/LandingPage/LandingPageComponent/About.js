import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faJsSquare,
  faReact,
  faNodeJs,
} from '@fortawesome/free-brands-svg-icons';
import {
  faAddressCard,
  faCalendar,
  faLocationDot,
  faPhone,
  faPalette,
  faSchool,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function About() {
  const infoIcons = [
    faAddressCard,
    faCalendar,
    faLocationDot,
    faPhone,
    faPalette,
    faSchool,
  ];
  const [info, setInfo] = useState([]);
  const [major, setMajor] = useState([]);
  const [upnext, setUpnext] = useState([]);

  useEffect(() => {
    // 이 주소로 가서 뭔가 얻어와라
    axios.get('/api/info').then((response) => setInfo(response.data));
    axios.get('/api/major').then((response) => setMajor(response.data));
    axios.get('/api/upnext').then((response) => setUpnext(response.data));
  }, []);

  const brandIcons = [faJsSquare, faReact, faNodeJs];

  return (
    <section id="about" className="section section__container">
      <h1>About Me</h1>
      <div className="myinfo">
        <ul className="infos">
          {info.map((info, index) => (
            <li key={index}>
              <div className="imgAndDesc">
                <FontAwesomeIcon
                  icon={infoIcons[index]}
                  className={info.className}
                />
                <div className="desc">
                  <h2>{info.title}</h2>
                  <h3>{info.detail}</h3>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <h2 className="majors__title">What I Am Current Doing</h2>
      <div className="about__majors">
        {major.map((major, index) => (
          <div className="major" key={index}>
            <div className="major__icon">
              <FontAwesomeIcon
                icon={brandIcons[index]}
                className={major.iconClassName}
              />
            </div>
            <h2 className="major__title">{major.majorTitle}</h2>
            <h3 className="major__description">{major.majorDesc}</h3>
          </div>
        ))}
      </div>
      <div className="about__next">
        <span>Up-next</span>
        {upnext.map((upnext, index) => (
          <div className="upnext" key={index}>
            <img src={upnext.imgSrc} alt="" className="skill_icon" />
            <div className="upnext__description">
              <p className="upnext__name">{upnext.upnextName}</p>
              <p className="upnext__category">{upnext.upnextCategory}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;
