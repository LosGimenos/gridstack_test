import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  copyCell: PropTypes.func
}

const Cell = ({ cellId }) => (
  <div
    className='cell'
    name={cellId}
  >
    <span><h2>{ cellId }</h2></span>
  </div>
);

Cell.propTypes = propTypes;
export default Cell;

// w
