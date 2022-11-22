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

function About() {
  return (
    <section id="about" className="section section__container">
      <h1>About Me</h1>
      <div className="myinfo">
        <ul className="infos">
          <li>
            <div className="imgAndDesc">
              <FontAwesomeIcon
                icon={faAddressCard}
                className="fa-solid fa-address-card"
              />
              <div className="desc">
                <h2>이름</h2>
                <h3>고종원</h3>
              </div>
            </div>
          </li>
          <li>
            <div className="imgAndDesc">
              <FontAwesomeIcon
                icon={faCalendar}
                className="fa-solid fa-calendar"
              />
              <div className="desc">
                <h2>생년월일</h2>
                <h3>1999.11.22</h3>
              </div>
            </div>
          </li>
          <li>
            <div className="imgAndDesc">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="fa-solid fa-location-dot"
              />
              <div className="desc">
                <h2>주소</h2>
                <h3>전라북도 전주시 완산구</h3>
              </div>
            </div>
          </li>
          <li>
            <div className="imgAndDesc">
              <FontAwesomeIcon icon={faPhone} className="fa-solid fa-phone" />
              <div className="desc">
                <h2>연락처</h2>
                <h3>010-9447-1363</h3>
              </div>
            </div>
          </li>
          <li>
            <div className="imgAndDesc">
              <FontAwesomeIcon
                icon={faPalette}
                className="fa-solid fa-palette"
              />
              <div className="desc">
                <h2>성향</h2>
                <h3>ENFJ / 4W5</h3>
              </div>
            </div>
          </li>
          <li>
            <div className="imgAndDesc">
              <FontAwesomeIcon icon={faSchool} className="fa-solid fa-school" />
              <div className="desc">
                <h2>학력</h2>
                <h3>군산대학교 컴퓨터정보공학</h3>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <h2 className="majors__title">What I Am Current Doing</h2>
      <div className="about__majors">
        <div className="major">
          <div className="major__icon">
            <FontAwesomeIcon
              icon={faJsSquare}
              className="fa-brands fa-js-square"
            />
          </div>
          <h2 className="major__title">JavaScript</h2>
          <h3 className="major__description">Front-end</h3>
        </div>
        <div className="major">
          <div className="major__icon">
            <FontAwesomeIcon icon={faReact} className="fa-brands fa-react" />
          </div>
          <h2 className="major__title">React.js</h2>
          <h3 className="major__description">Front-end</h3>
        </div>
        <div className="major">
          <div className="major__icon">
            <FontAwesomeIcon icon={faNodeJs} className="fa-brands fa-node-js" />
          </div>
          <h2 className="major__title">Node.js</h2>
          <h3 className="major__description">Back-end</h3>
        </div>
      </div>
      <div className="about__next">
        <span>Up-next</span>
        <div className="upnext">
          <img src="imgs/icons/typescript.png" alt="" className="skill_icon" />
          <div className="upnext__description">
            <p className="upnext__name">TypeScript</p>
            <p className="upnext__category">Front-end</p>
          </div>
        </div>
        <div className="upnext">
          <img src="imgs/icons/mongoDB.png" alt="" className="skill_icon" />
          <div className="upnext__description">
            <p className="upnext__name">MongoDB</p>
            <p className="upnext__category">Back-end</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
