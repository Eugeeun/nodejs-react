import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHtml5,
  faCss3Alt,
  faJsSquare,
  faPython,
} from '@fortawesome/free-brands-svg-icons';
import { faC } from '@fortawesome/free-solid-svg-icons';

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="section__container">
        <h1>What I Can Handle</h1>
        <h2>Skills & Attributes</h2>
        <div className="skillset">
          <div className="skillset__left">
            <h3 className="skillset__title">Skills</h3>
            <div className="skill">
              <div className="skill__description">
                <div className="icon">
                  <span>HTML</span>
                  <FontAwesomeIcon icon={faHtml5} className="fab fa-html5" />
                </div>
                <span>95%</span>
              </div>
              <div className="skill__bar">
                <div className="skill__value" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div className="skill">
              <div className="skill__description">
                <div className="icon">
                  <span>CSS</span>
                  <FontAwesomeIcon
                    icon={faCss3Alt}
                    className="fa-brands fa-css3-alt"
                  />
                </div>
                <span>90%</span>
              </div>
              <div className="skill__bar">
                <div className="skill__value" style={{ width: '90%' }}></div>
              </div>
            </div>
            <div className="skill">
              <div className="skill__description">
                <div className="icon">
                  <span>JavaScript</span>
                  <FontAwesomeIcon
                    icon={faJsSquare}
                    className="fa-brands fa-js-square"
                  />
                </div>
                <span>85%</span>
              </div>
              <div className="skill__bar">
                <div className="skill__value" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="skill">
              <div className="skill__description">
                <div className="icon">
                  <span>C/C++</span>
                  <FontAwesomeIcon icon={faC} className="fa-solid fa-c" />
                </div>
                <span>99%</span>
              </div>
              <div className="skill__bar">
                <div className="skill__value" style={{ width: '99%' }}></div>
              </div>
            </div>
            <div className="skill">
              <div className="skill__description">
                <div className="icon">
                  <span>Python</span>
                  <FontAwesomeIcon
                    icon={faPython}
                    className="fa-brands fa-python"
                  />
                </div>
                <span>75%</span>
              </div>
              <div className="skill__bar">
                <div className="skill__value" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>

          <div className="skillset__right">
            <div className="tools">
              <h3 className="skillset__title">Tools</h3>
              <ul className="tool__list">
                <li>
                  <span>Visual Studio</span>
                </li>
                <li>
                  <span>Visual Studio Code</span>
                </li>
                <li>
                  <span>Eclipse</span>
                </li>
              </ul>
            </div>
            <div className="etc">
              <h3 className="skillset__title">Etc</h3>
              <ul className="etc">
                <li>
                  <span>Git</span>
                </li>
                <li>
                  <span>Github</span>
                </li>
                <li>
                  <span>PowerPoint</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
