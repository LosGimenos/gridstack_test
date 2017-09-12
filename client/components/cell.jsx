import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  copyCell: PropTypes.func
}

const Cell = ({ title, chart, cellId, rowId, formula, copyCell, cellsInRow, collectHoveredCells, copyFromHover }) => (
  <div
    className='cell'
    name={cellId}
    onClick={function() {copyCell(cellsInRow, rowId, cellId)}}
    draggable='true'
    onDragStart={(event) => {
        event.dataTransfer.setData('masterCell', cellId);
      }
    }
    onDragOver={(event)=> {
      event.preventDefault();
    }}
    onDragEnter={(event) => {
      event.preventDefault();
      collectHoveredCells(cellId);
    }}
    onDrop={(event) => {
      event.preventDefault();
      const masterCell = event.dataTransfer.getData('masterCell');
      copyFromHover(masterCell);
    }}
  >
    <button className="button__cell">X</button>
    <span><h2>{ cellId }</h2></span>
    <span><p>{ title }</p></span>
    <span><p>render: { chart }</p></span>
  </div>
);

Cell.propTypes = propTypes;
export default Cell;
