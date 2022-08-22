import React from 'react';
import './indicator.css';

function Indicator({value, text}) {
  return (
    <div container className="indicator">
      <div>
        <span className="dot colour" style={{background: value, color: `${value}66`}}></span>
      </div>
      <div item>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Indicator;
