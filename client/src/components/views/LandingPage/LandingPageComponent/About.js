import React from 'react';
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
import about from '../data/about.json';

function About() {
  const infoIcons = [
    faAddressCard,
    faCalendar,
    faLocationDot,
    faPhone,
    faPalette,
    faSchool,
  ];

  const brandIcons = [faJsSquare, faReact, faNodeJs];

  return (
    <section id="about" className="section section__container">
      <h1>About Me</h1>
      <div className="myinfo">
        <ul className="infos">
          {about.infos.map((info, index) => (
            <li key={index}>
              <div className="imgAndDesc">
                <FontAwesomeIcon
                  icon={infoIcons[index]}
                  className={info.imgAndDesc.className}
                />
                <div className="desc">
                  <h2>{info.desc.title}</h2>
                  <h3>{info.desc.detail}</h3>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <h2 className="majors__title">What I Am Current Doing</h2>
      <div className="about__majors">
        {about.majors.map((major, index) => (
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
        {about.upnext.map((next, index) => (
          <div className="upnext" key={index}>
            <img src={next.imgSrc} alt="" className="skill_icon" />
            <div className="upnext__description">
              <p className="upnext__name">{next.upnextName}</p>
              <p className="upnext__category">{next.upnextCategory}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;
