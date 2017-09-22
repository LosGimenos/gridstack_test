import React from 'react';
import Cell from './cell.jsx';

const Row = ({ matrixCells, cellsInRow, rowId, addChart, setStartingDOMLocation, updateMatrixCell }) => {
  const renderCells = cellsInRow.map((cell, index) => {
    const matrixCell = matrixCells[cell];
    return (
      <Cell
        key={index}
        rowId={rowId}
        cellId={cell}
        canAddChart={matrixCell.canAddChart}
        addChart={addChart}
        setStartingDOMLocation={setStartingDOMLocation}
        updateMatrixCell={updateMatrixCell}
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
