import React, { Component } from 'react';
import Chart from './chart.jsx';
import Row from './row.jsx';
import ActionButton from './button.jsx';

export default class Matrix extends Component {
  constructor() {
    super();
    this.state = {
      cells: {
        '11': {
          id: 11,
          canAddChart: true
        },
        '12': {
          id: 12,
          canAddChart: true
        },
        '13': {
          id: 13,
          canAddChart: true
        },
        '14': {
          id: 14,
          canAddChart: true
        },
        '21': {
          id: 21,
          canAddChart: true
        },
        '22': {
          id: 22,
          canAddChart: true
        },
        '23': {
          id: 23,
          canAddChart: true
        },
        '24': {
          id: 24,
          canAddChart: true
        }
      },
      chartList: [],
      charts: {},
      rows: {
        '1': {
          id: 1,
          cellsInRow: [11,12,13,14]
        },
        '2': {
          id: 2,
          cellsInRow: [21,22,23,24]
        }
      },
      rowList: [1,2],
      columnCount: 4,
      rowCount: 2
    };
    this.columnLimit = 8;
    this.rowLimit = 6;

    this.addChart = this.addChart.bind(this);
    this.addColumn = this.addColumn.bind(this);
    this.addRow = this.addRow.bind(this);
    this.setStartingDOMLocation = this.setStartingDOMLocation.bind(this);
    this._isCellOccupied = this._isCellOccupied.bind(this);
    this._getDOMLocationOfCell = this._getDOMLocationOfCell.bind(this);
    this._occupyCell = this._occupyCell.bind(this);
    this._unoccupyCell = this._unoccupyCell.bind(this);
    this._removeChart = this._removeChart.bind(this);
    this._getColumnAndRowCount = this._getColumnAndRowCount.bind(this);
    this._findPositionInRow = this._findPositionInRow.bind(this);
    this._findPositionInColumn = this._findPositionInColumn.bind(this);
    this._getCellRect = this._getCellRect.bind(this);
  }

  updateCellLocations() {
    const cells = this.state.cells;
    const matrixCells = document.querySelectorAll('.matrix-cell');

    matrixCells.forEach((cell) => {
      const cellId = cell.getAttribute('name');
      const cellLocation = cell.getBoundingClientRect();
      cells[cellId]['startingX'] = cellLocation.left;
      cells[cellId]['startingY'] = cellLocation.top;
    })

    this.setState({ cells });
  }

  addChart(cellId, row=1, column=1) {
    let hightestId;
    const chartList = this.state.chartList;
    const charts = this.state.charts;
    const cells = this.state.cells;

    if (chartList.length == 0 ) {
      hightestId = 0;
    } else {
        hightestId = Math.max.apply(null, Object.keys(this.state.charts));
    }
    charts[hightestId + 1] = {
      id: hightestId + 1,
      startingCell: cellId,
      startingRowSpan: row,
      startingColumnSpan: column
    }
    chartList.push(hightestId + 1);
    cells[cellId]['canAddChart'] = false;

    this.setState({ cells });
    this.setState({ charts });
    this.setState({ chartList });
  }

  addCell(rowId) {
    const rows = this.state.rows;
    const cells = this.state.cells;

    const highestId = Math.max.apply(null, rows[rowId]['cellsInRow']);
    const cellId = parseInt(highestId + 1);
    cells[cellId] ={
      id: cellId,
      canAddChart: true,
      startingX: null,
      startingY: null
    }
    rows[rowId].cellsInRow.push(highestId + 1);

    this.setState({ cells });
    this.setState({ rows });
  }

  addColumn() {
    if (this.state.columnCount + 1 <= this.columnLimit) {
      this.state.rowList.forEach((row) => {
        while (this.state.rows[row]['cellsInRow'].length < this.state.columnCount + 1) {
          this.addCell(row);
        }
      });
      this.setState((prevState, props) => {
        return {columnCount: prevState.columnCount + 1};
      });
    }
    this.updateCellLocations();
  }

  addRow() {
    if (this.state.rowList.length + 1 <= this.rowLimit) {
      const rows = this.state.rows;
      const rowList = this.state.rowList;
      const cells = this.state.cells;
      let highestId = Math.max.apply(null, Object.keys(this.state.rows));
      let cellId = parseInt((highestId + 1) + '1' );
      cells[cellId] = {
        id: cellId,
        canAddChart: true,
        startingX: null,
        startingY: null
      }

      rows[highestId + 1] = {
        id: highestId + 1,
        cellsInRow: [cellId]
      }
      rowList.push(highestId + 1);

      while (rows[highestId + 1]['cellsInRow'].length < this.state.columnCount) {
        const highestCellIdInRow = Math.max.apply(null, rows[highestId + 1]['cellsInRow']);
        const rowNewCellId = highestCellIdInRow + 1;

        const newCell = cells[rowNewCellId] = {
          id: rowNewCellId,
          canAddChart: true,
          startingX: null,
          startingY: null
        }

        rows[highestId + 1]['cellsInRow'].push(rowNewCellId);
      }

      this.setState({ cells });
      this.setState({ rows });
      this.setState({ rowList });
      this.setState({ rowCount: this.state.rowCount + 1 });
    }

    this.updateCellLocations();
  }

  addToRowCount() {
    this.setState({ rowCount: this.state.rowCount + 1 });
    console.log('add to row')
  }

  setStartingDOMLocation(cellId, x, y) {
    const cells = this.state.cells;
    cells[cellId]['startingX'] = x;
    cells[cellId]['startingY'] = y;

    this.setState({ cells });
  }

  _isCellOccupied(cellId) {
    return this.state.cells[cellId]['canAddChart'] ? false : true;
  }

  _getDOMLocationOfCell(cellId) {
    const el = document.getElementsByName(cellId)[0];
    const elRect = el.getBoundingClientRect();
    const { top, left } = elRect;
    const x = left;
    const y = top;

    return { x, y };
  }

  _occupyCell(cellId) {
    const cells = this.state.cells;
    const cell = cells[cellId];
    cell['canAddChart'] = false;

    this.setState({ cells });
  }

  _unoccupyCell(cellId) {
    const cells = this.state.cells;
    const cell = cells[cellId];
    cell['canAddChart'] = true;

    this.setState({ cells });
  }

  _removeChart(chartId) {
    const charts = this.state.charts;
    const chartList = this.state.chartList;
    const indexOfChartId = chartList.indexOf(chartId);

    delete charts[chartId];
    chartList.splice(indexOfChartId, 1);

    this.setState({ charts });
    this.setState({ chartList });
  }

  _getColumnAndRowCount() {
    return {
      columnCount: this.state.columnCount,
      rowCount: this.state.rowList.length
    }
  }

  _findPositionInRow(cellId) {
    const rowPosition = cellId.toString().split('')[0];
    const cellsInRow = this.state.rows[rowPosition]['cellsInRow'];
    const cellPosition = cellsInRow.indexOf(cellId)
    const lastIndexOfRow = cellsInRow.length - 1;
    return parseInt(lastIndexOfRow) - parseInt(cellPosition);
  }

  _findPositionInColumn(cellId) {
    const rowPosition = cellId.toString().split('')[0];
    const cellPosition = this.state.rowList.indexOf(parseInt(rowPosition));
    const lastIndexOfColumn = this.state.rowList.length - 1;
    return parseInt(lastIndexOfColumn) - parseInt(cellPosition);
  }

  _getCellRect(cellId) {
    const cell = document.getElementsByName(cellId)[0];
    const cellRect = cell.getBoundingClientRect();

    return cellRect;
  }

  renderRows() {
    const rowArray = this.state.rowList;
    return rowArray.map((row, index) => {
      const rowData = this.state.rows[row];
      return (
        <Row
          matrixCells={this.state.cells}
          key={index}
          rowId={rowData.id}
          cellsInRow={rowData.cellsInRow}
          addChart={this.addChart}
          setStartingDOMLocation={this.setStartingDOMLocation}
          updateMatrixCell={this._updateMatrixCell}
        />
      );
    })
  }

  renderCharts() {
    return this.state.chartList.map((chartId, index) => {
      const chartInfo = this.state.charts[chartId];
      const originCell = chartInfo['startingCell'];
      const { x, y } = this._getDOMLocationOfCell(originCell);

      return (
        <Chart
          key={chartInfo.id}
          id={chartInfo.id}
          originCell={chartInfo.startingCell}
          startingX={x}
          startingY={y}
          startingColumnSpan={chartInfo.startingColumnSpan}
          startingRowSpan={chartInfo.startingRowSpan}
          getCellRect={this._getCellRect}
          isOccupied={this._isCellOccupied}
          getDOMLocationOfCell={this._getDOMLocationOfCell}
          occupyCell={this._occupyCell}
          unoccupyCell={this._unoccupyCell}
          removeChart={this._removeChart}
          findPositionInRow={this._findPositionInRow}
          findPositionInColumn={this._findPositionInColumn}
          rowCount={this.state.rowCount}
          columnCount={this.state.columnCount}
          addChart={this.addChart}
        />
      );
    })
  }

  render() {
    return (
      <div className='matrix'>
        <ActionButton
          style={'button__addRow'}
          buttonText={'Add Row'}
          buttonAction={this.addRow}
        />
        <ActionButton
          style={'button__addColumn'}
          buttonText={'Add Column'}
          buttonAction={this.addColumn}
        />
        { this.renderRows() }
        { this.renderCharts() }
      </div>
    );
  }
}
