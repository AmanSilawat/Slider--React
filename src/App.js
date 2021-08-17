import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft, FiAlignLeft, FiAlignRight } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';
function App() {
  const [people, set_people] = useState(data);
  const [index, set_index] = useState(2);

  useEffect(() => {
    const last_index = people.length - 1;
    if (index < 0) {
      set_index(last_index)

    }
    if (index > last_index) {
      set_index(0)
    }
  }, [index, people])

  useEffect(() => {
    let slider = setInterval(() => {
      set_index(+ 1)
    }, 3000)
    
    return () => clearInterval(slider)
  }, [index])

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className="section-center">
        {people.map((person, person_index) => {
          const { id, image, name, title, quote } = person;
          let position = 'nextSlide';
          if (person_index === index) {
            position = 'activeSlide';
          }
          if (person_index === index - 1 || (index === 0 && person_index === people.length - 1)) {
            position = 'lastSlide';
          }

          return (
            <article key={id} className={position}>
              <img
                src={image}
                alt={name}
                className='person-img'
              />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className='icon' />
            </article>
          )
        })}
        <button className="prev" onClick={() => set_index(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => set_index(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
