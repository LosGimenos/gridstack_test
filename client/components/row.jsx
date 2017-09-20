import React from 'react';
import Cell from './cell.jsx';

const Row = ({ cellsInRow, rowId, addChart, setStartingDOMLocation }) => {
  const renderCells = cellsInRow.map((cell, index) => {
    return (
      <Cell
        key={index}
        rowId={rowId}
        cellId={cell}
        addChart={addChart}
        setStartingDOMLocation={setStartingDOMLocation}
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
