import React from 'react';
import Cell from './cell.jsx';

const Row = ({ cellsInRow, rowId, addChart }) => {
  const renderCells = cellsInRow.map((cell, index) => {
    console.log(cell)
    return (
      <Cell
        key={index}
        rowId={rowId}
        cellId={cell}
        addChart={addChart}
      />
    );
  })
  return (
    <div className='row'>
      { renderCells }
    </div>
  );
};

export default Row;
