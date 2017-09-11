import React, { Component } from 'react';
import Row from './row.jsx';

export default class Matrix extends Component {
  constructor() {
    super();
    this.state = {
      cells: [
        {
          row_position: 1,
          column_position: 1,
          chartType: 'Pie',
          formula: '',
          title: 'Chart Thing'
        }
      ],
      rows: [1],
      columnCount: 1
    };
    this.addCell = this.addCell.bind(this);
    this.deleteCell = this.deleteCell.bind(this);
  }

  addRow() {
    console.log('clicked')
    const rows = this.state.rows
    const rowValue = rows[rows.length-1] + 1
    console.log(rows.length)
    rows.push(rowValue)
    console.log(rows)
    this.addCell(rowValue)
    console.log(this.state.cells)
    this.setState({ rows: rows });
  }

  addColumn() {
    this.setState({ columnCount: this.state.columnCount + 1 });
  }

  addCell(row) {
    console.log('added cell');
    const cells = this.state.cells;
    if (cells.length < this.state.columnCount) {
      cells.push(
        {
          row_position: row,
          column_position: this.state.columnCount + 1,
          chartType: '',
          formula: '',
          title: ''
        }
      );
      this.setState({ cells: cells });
    }
  }

  deleteCell(row, column) {
    const cells = this.state.cells;
    cells.forEach((cell, index) => {
      if (cell.row_position == row && cell.column_position == column) {
        cells.splice(index, 1);
      } else {
      }
    })
    this.setState({ cells: cells });
  }

  renderRows() {
    return this.state.rows.map((cell) => {
      return (
        <Row
          cells={this.state.cells}
          level={cell}
          addCell={this.addCell}
          deleteCell={this.deleteCell}
        />
      );
    })
  }

  render() {
    return (
      <div className='matrix__container'>
        <div className='button__addRow' onClick={ () => this.addRow() }>
          <span><p>+</p></span>
        </div>
        <div className='button__addColumn' onClick={ () => this.addColumn() }>
          <span><p>+</p></span>
        </div>
        <div className='matrix'>
          { this.renderRows() }
        </div>
      </div>
    );
  }
}
