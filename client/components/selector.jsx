import React from 'react';

const Selector = ({ setChartToCell }) => (
  <button
    className='selector'
    onClick={(e) => {setChartToCell(e.target.value)}}>
    <span><p>Add Chart</p></span>
  </button>
);

export default Selector;
