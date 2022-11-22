import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
function ArrowUp() {
  return (
    <button className="toTopBtn">
      <FontAwesomeIcon icon={faArrowUp} className="fas fa-arrow-up" />
    </button>
  );
}

export default ArrowUp;
