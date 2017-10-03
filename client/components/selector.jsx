import React from 'react';

const Selector = ({ setChartToCell }) => (
  <button
    className='selector'
    onClick={(e) => {e.preventDefault(); setChartToCell()}}>
    <span><p>Add Chart</p></span>
  </button>
);

export default Selector;
