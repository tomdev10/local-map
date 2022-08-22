import React from 'react';
import './Indicator.css';

function Indicator({value, text}) {
  return (
    <div className="indicator">
      <div>
        <span className="dot colour" style={{background: value, color: `${value}66`}}></span>
      </div>
      <div>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Indicator;
