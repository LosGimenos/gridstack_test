import React, { Component } from 'react';
import Row from './row.jsx';
import Chart from './chart.jsx';

export default class Matrix extends Component {
  constructor() {
    super();
      this.cells = {
        '11': {
          id: 11,
          hasChart: false,
          hasSharedChart: false,
          canAddChart: true,
          chartId: ''
        },
        '12': {
          id: 12,
          hasChart: false,
          hasSharedChart: false,
          canAddChart: true,
          chartId: ''
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
    this.state = {
      cells: this.cells,
      charts: {},
      row_array: [
        this.rows['1']
      ],
      matrix: [
        this.rows['1']
      ],
      columnCount: 2
    };
    this.addCell = this.addCell.bind(this);
    this.clearCell = this.clearCell.bind(this);
    this.addChart = this.addChart.bind(this);
    this.setChartToCell = this.setChartToCell.bind(this);
    this.checkHasChart = this.checkHasChart.bind(this);
    this.setSharedChartToCell = this.setSharedChartToCell.bind(this);
    this.checkHasSharedChart = this.checkHasSharedChart.bind(this);
    this.checkNumRowsAndColumns = this.checkNumRowsAndColumns.bind(this);
    this.getCell = this.getCell.bind(this);
    this.updateCells = this.updateCells.bind(this);
    // this.deleteCell = this.deleteCell.bind(this);
  }

  addRow() {
    const rowArray = this.state.row_array;
    const cells = this.cells;
    const row_index = rowArray.length;
    const workingRow = this.rows[row_index + 1] = {
                        row_id: row_index + 1,
                        cellsInRow: []
                       };
    const firstCellId = (row_index + 1).toString() + '1';
    const firstCell = cells[firstCellId] = {
                        id: parseInt(firstCellId),
                        canAddChart: true
                      }
    workingRow['cellsInRow'].push(firstCell);

    const idValues = [];
    while (workingRow['cellsInRow'].length < this.state.columnCount) {
      workingRow['cellsInRow'].forEach((cell) => {
        if (cell['id']) {
          idValues.push(parseInt(cell['id']));
        }
      })
      const highestIdValue = Math.max.apply(null, idValues);
      const newCell = cells[highestIdValue + 1] = {
        id: highestIdValue + 1,
        canAddChart: true
      }
      workingRow['cellsInRow'].push(newCell);
    };
    rowArray.push(workingRow);
    this.cells = cells;
    this.setState({ cells: cells });
    this.setState({ row_array: rowArray });
  }

  addColumn() {
    if (this.state.columnCount < 8) {
      this.state.row_array.forEach((row) => {
        while (row['cellsInRow'].length < this.state.columnCount + 1) {
          const idValues = [];
          row['cellsInRow'].forEach((cell) => {
            if (cell['id']) {
              idValues.push(parseInt(cell['id']));
            }
          })
          const highestIdValue = Math.max.apply(null, idValues);

          this.cells[highestIdValue + 1] = {
            id: highestIdValue + 1,
            canAddChart: true
          };
          row['cellsInRow'].push(this.cells[highestIdValue + 1]);
        }
      })
    }
    this.setState({ columnCount: this.state.columnCount + 1 });
    this.setState({ cells: this.cells });
  }

  addCell(cellsInRow, row_id) {
    const cells = this.cells;
    const positionInRow = cellsInRow.length + 1;
    const cell_id = row_id.toString() + positionInRow.toString();
    cells[cell_id] = {
      id: parseInt(cell_id),
    };
    this.cells = cells;
    const rowToPush = this.rows[row_id];
    this.rows[row_id.toString()]['cellsInRow'].push(this.cells[cell_id]);
  }

  clearCell(cellId) {
    const cells = this.cells;
    cells[cellId] = {
      id: parseInt(cellId),
      hasChart: false,
      hasSharedChart: false,
      canAddChart: true,
      chartId: ''
    }
    this.cells = cells;
    this.setState({ cells: this.cells });
    console.log(cells[cellId])
  }

  addChart(chartType) {
    const charts = this.state.charts;
    const chartKeys = Object.keys(charts);
    let chartId = null;
    if (chartKeys.length == 0) {
      charts[0] = {
        id: 0,
        chartType: chartType,
      }
      chartId = 0;
    } else {
        const highestIdValue = Math.max.apply(null, chartKeys);
        charts[highestIdValue + 1] = {
          id: highestIdValue + 1,
          chartType: chartType
        }
        chartId = highestIdValue + 1;
    }
    this.setState({ charts: charts });
    return chartId;
  }

  setChartToCell(cellId, chartId) {
    const cells = this.cells;
    cells[cellId]['hasChart'] = true;
    cells[cellId]['chartId'] = chartId;
    this.cells = cells;
    this.setState({ cells: this.cells });
  }

  setSharedChartToCell(cellId, chartId) {
    const cells = this.cells;
    cells[cellId]['hasSharedChart'] = true;
    cells[cellId]['chartId'] = chartId;

    this.cells = cells;
    this.setState({ cells: this.cells });
  }

  checkHasChart(cellId) {
    return this.cells[cellId]['hasChart'];
  }

  checkHasSharedChart(cellId) {
    return this.cells[cellId]['hasSharedChart'];
  }

  checkNumRowsAndColumns() {
    return {
      columnCount: this.state.columnCount,
      rowCount: this.state.row_array.length
    }
  }

  getCell(cellId) {
    return this.cells[cellId];
  }

  updateCells(cell) {
    this.cells = cells;
    this.setState({ cells });
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
          clearCell={this.clearCell}
          addChart={this.addChart}
          setChartToCell={this.setChartToCell}
          charts={this.state.charts}
          checkHasChart={this.checkHasChart}
          setSharedChartToCell={this.setSharedChartToCell}
          checkHasSharedChart={this.checkHasSharedChart}
          checkNumRowsAndColumns={this.checkNumRowsAndColumns}
          getCell={this.getCell}
          updateCells={this.updateCells}
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
