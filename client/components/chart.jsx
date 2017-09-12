import React from 'react';

const Chart = ({ charts, chartId }) => (
  <div className='object' >
    <button className="button__cell--clear">X</button>
    <div className='sizer-nodule' draggable='true' />
    <span><p>{ console.log(charts[chartId]) }</p></span>
    <span><p>id: { chartId }</p></span>
  </div>
);

export default Chart;
