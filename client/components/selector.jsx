import React from 'react';

const Selector = ({ setChartToCell }) => (
  <select
    className='selector'
    defaultValue='add'
    onChange={(e) => {setChartToCell(e.target.value)}}>
    <option value='bar'>bar graph</option>
    <option value='pie'>pie chart</option>
    <option value='add'>ADD</option>
  </select>
);

export default Selector;
