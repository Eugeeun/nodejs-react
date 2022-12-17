import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Works() {
  const filters = ['all', 'front-end', 'back-end', 'mobile'];
  const [work, setWork] = useState([]);

  useEffect(() => {
    const allBtn = document.querySelector('.category__btn');
    allBtn.classList.add('selected');

    axios.get('/api/work').then((response) => setWork(response.data));
  }, []);

  return (
    <section id="work" className="section">
      <div className="section__container">
        <h1>My Work</h1>
        <h3>Projects</h3>
        <div className="work__categories">
          {filters.map((filter, index) => (
            <button className="category__btn" data-filter={filter} key={index}>
              <span>{filter}</span>
            </button>
          ))}
        </div>
        <div className="work__projects">
          {work.map((data, index) => (
            <a
              href={data.href}
              className={data.aClassName}
              target={data.target}
              data-type={data.dataType}
              key={index}
            >
              <img
                src={data.src}
                alt={data.alt}
                className={data.imgClassName}
              />
              <div className={data.divClassName}>
                <h3>{data.title}</h3>
                <span>{data.used}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Works;
