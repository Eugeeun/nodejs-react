import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHtml5,
  faCss3Alt,
  faJsSquare,
  faPython,
  faJava,
  faReact,
  faNodeJs,
} from '@fortawesome/free-brands-svg-icons';
import { faC } from '@fortawesome/free-solid-svg-icons';
import mySkill from '../data/skills.json';

function Skills() {
  const skillIcons = [
    faHtml5,
    faCss3Alt,
    faJsSquare,
    faC,
    faPython,
    faJava,
    faReact,
    faNodeJs,
  ];
  return (
    <section id="skills" className="section">
      <div className="section__container">
        <h1>What I Can Handle</h1>
        <h2>Skills & Attributes</h2>
        <div className="skillset">
          <div className="skillset__left">
            <h3 className="skillset__title">Skills</h3>
            {mySkill.skills.map((skill, index) => (
              <div className="skill" key={index}>
                <div className="skill__description">
                  <div className="icon">
                    <span>{skill.skillName}</span>
                    <FontAwesomeIcon
                      icon={skillIcons[index]}
                      className={skill.class}
                    />
                  </div>
                  <div className="skill__bar">
                    <div
                      className="skill__value"
                      style={{ width: `${skill.width}` }}
                    ></div>
                  </div>
                  <span>{skill.width}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="skillset__right">
            <div className="tools">
              <h3 className="skillset__title">Tools</h3>
              <ul className="tool__list">
                {mySkill.tools.map((tool, index) => (
                  <li key={index}>
                    <span>{tool.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="etc">
              <h3 className="skillset__title">DB</h3>
              <ul className="etc">
                {mySkill.DB.map((etc, index) => (
                  <li key={index}>
                    <span>{etc.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
