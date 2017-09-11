import React from 'react';

const Cell = ({ title, chart, row_position, column_position, formula, addCell, deleteCell }) => (
  <div className='cell' onDoubleClick={() => addCell(row_position)}>
    <button className="button__cell" onClick={()=> deleteCell(row_position, column_position)}>X</button>
    <span><h2>{ row_position.toString() + column_position.toString() }</h2></span>
    <span><p>{ title }</p></span>
    <span><p>render: { chart }</p></span>
  </div>
)

export default Cell;
