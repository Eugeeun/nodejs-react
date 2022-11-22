import React, { useEffect, useState } from 'react';
import workData from '../data/works.json';

function Works() {
  const filters = ['all', 'front-end', 'back-end', 'mobile'];

  useEffect(() => {
    const allBtn = document.querySelector('.category__btn');
    allBtn.classList.add('selected');
  });

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
          {workData.works.map((data, index) => (
            <a
              href={data.a.href}
              className={data.a.className}
              target={data.a.target}
              data-type={data.a.dataType}
              key={index}
            >
              <img
                src={data.img.src}
                alt={data.img.alt}
                className={data.img.className}
              />
              <div className={data.div.className}>
                <h3>{data.div.title}</h3>
                <span>{data.div.used}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Works;
