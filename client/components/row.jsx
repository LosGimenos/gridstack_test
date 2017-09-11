import React, { Component } from 'react';
import Cell from './cell.jsx';

export default class Row extends Component {
  constructor(props) {
    super(props);
    this.name = props.level;
  }

  renderCells() {
    return this.props.cells.map((cell) => {
      if (cell.row_position == this.name) {
        return (
          <Cell
            title={cell.title}
            formula={cell.formula}
            row_position={cell.row_position}
            column_position={cell.column_position}
            chart={cell.chartType}
            addCell={this.props.addCell}
            deleteCell={this.props.deleteCell}
          />
        );
      }
    })
  }

  render() {
    return (
      <div className='row' name={`row${this.name}`}>
        { this.renderCells() }
      </div>
    );
  }
}
