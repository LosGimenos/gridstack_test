import React from 'react';

const Chart = ({ chartType, chartId }) => (
  <div className='object' >
    <button className="button__cell--clear">X</button>

    <span><p>{ chartType }</p></span>
    <span><p>id: { chartId }</p></span>
  </div>
);

export default Chart;
