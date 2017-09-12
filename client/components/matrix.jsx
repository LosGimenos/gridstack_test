import React, { Component } from 'react';
import Row from './row.jsx';

export default class Matrix extends Component {
  constructor() {
    super();
      this.cells = {
        '11': {
          id: 11,
          chartType: 'Pie',
          formula: '',
          title: 'Chart Thing'
        },
        '12': {
          id: 12,
          chartType: 'Graph',
          formula: 'woot',
          title: 'Graph Thing'
        }
      };
      this.rows = {
        '1': {
          row_id: 1,
          cellsInRow: [
            this.cells['11'], this.cells['12']
          ]
        }
      };
      this.hoveredCells = [];
    this.state = {
      cells: this.cells,
      row_array: [
        this.rows['1']
      ],
      matrix: [
        this.rows['1']
      ],
      columnCount: 2
    };
    this.addCell = this.addCell.bind(this);
    this.copyCell = this.copyCell.bind(this);
    this.collectHoveredCells = this.collectHoveredCells.bind(this);
    this.copyFromHover = this.copyFromHover.bind(this);
    // this.deleteCell = this.deleteCell.bind(this);
  }

  addRow() {
    const rowArray = this.state.row_array;
    const row_index = rowArray.length;
    this.rows[(row_index + 1).toString()] = {
      row_id: row_index + 1,
      cellsInRow: []
    };
    while (this.rows[(row_index + 1).toString()]['cellsInRow'].length < this.state.columnCount) {
      this.rows[(row_index + 1).toString()]['cellsInRow'].push('');
    }
    const row = this.rows[(row_index + 1).toString()];
    rowArray.push(row);
    this.setState({ row_array: rowArray });
  }

  addColumn() {
    if (this.state.columnCount < 8) {
      this.state.row_array.forEach((row) => {
        while (row['cellsInRow'].length < this.state.columnCount + 1) {
          row['cellsInRow'].push('');
        }
      })
    }
    this.setState({ columnCount: this.state.columnCount + 1 });
  }

  addCell(cellsInRow, row_id) {
    const cells = this.cells;
    const positionInRow = cellsInRow.length + 1;
    const cell_id = row_id.toString() + positionInRow.toString();
    cells[cell_id] = {
      id: parseInt(cell_id),
      chartType: '',
      formula: '',
      title: ''
    };
    this.cells = cells;
    const rowToPush = this.rows[row_id];
    this.rows[row_id.toString()]['cellsInRow'].push(this.cells[cell_id]);
  }

  copyCell(cellsInRow, rowId, cellId) {
    const cells = this.cells;
    const cellIndex = this.rows[rowId]['cellsInRow'].findIndex((cell) => {
      return cell.id == cellId;
    })

    const idValues = [];
    this.rows[rowId]['cellsInRow'].forEach((cell) => {
      if (cell['id']) {
        idValues.push(parseInt(cell['id']));
      }
    })

    const highestIdValue = Math.max.apply(null, idValues);
    const cellToBeCopied = this.rows[rowId]['cellsInRow'][cellIndex + 1]

    if (!cellToBeCopied && idValues.length < this.state.columnCount) {
      cells[highestIdValue + 1] = {
        id: highestIdValue + 1,
        chartType: cells[cellId]['chartType'],
        formula: cells[cellId]['formula'],
        title: cells[cellId]['title']
      }
      this.rows[rowId]['cellsInRow'][cellIndex + 1] = cells[highestIdValue + 1];
    } else if (cellToBeCopied && idValues.length <= this.state.columnCount) {
      cells[cellToBeCopied['id']]['chartType'] =cells[cellId]['chartType'];
      cells[cellToBeCopied['id']]['formula'] =cells[cellId]['formula'];
      cells[cellToBeCopied['id']]['title'] =cells[cellId]['title'];
    }

    this.cells = cells;
    this.setState({ cells: cells });
  }

  copyFromHover(masterCell) {
    const cells = this.cells;
    const cellsToCopy = this.hoveredCells;
    cellsToCopy.forEach((cell) => {
      cells[cell]['chartType'] = cells[masterCell]['chartType'];
      cells[cell]['formula'] = cells[masterCell]['formula'];
      cells[cell]['title'] = cells[masterCell]['title'];
    });

    this.cells = cells;
    this.hoveredCells = [];
    this.setState({ cells: cells });
  }

  collectHoveredCells(cellId) {
    this.hoveredCells.push(cellId);
  }

  // deleteCell(row, column) {
  //   const cells = this.state.cells;
  //   cells.forEach((cell, index) => {
  //     if (cell.row_position == row && cell.column_position == column) {
  //       cells.splice(index, 1);
  //     } else {
  //     }
  //   })
  //   this.setState({ cells: cells });
  // }

  renderRows() {
    const rowArray = this.state.row_array;
    return rowArray.map((row) => {
      return (
        <Row
          allCells={this.cells}
          cellsInRow={row['cellsInRow']}
          rowId={row['row_id']}
          addCell={this.addCell}
          copyCell={this.copyCell}
          collectHoveredCells={this.collectHoveredCells}
          copyFromHover={this.copyFromHover}
        />
      );
    })
  }

  render() {
    return (
      <div className='matrix__container'>
        <div className='button__addRow' onClick={() => this.addRow() }>
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
