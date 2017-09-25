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
        }
      },
      chartList: [],
      charts: {},
      rows: {
        '1': {
          id: 1,
          cellsInRow: [11]
        }
      },
      rowList: [1],
      columnCount: 1
    };

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
  }

  addChart(chartType, cellId) {
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
      chartType: chartType,
      startingCell: cellId
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
    this.state.rowList.forEach((row) => {
      while (this.state.rows[row]['cellsInRow'].length < this.state.columnCount + 1) {
        this.addCell(row);
      }
    });
    this.setState((prevState, props) => {
      return {columnCount: prevState.columnCount + 1};
    });
  }

  addRow() {
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
    const cell = this.state.cells[cellId];
    const x = cell['startingX'];
    const y = cell['startingY'];

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
    const newChartList = chartList.slice(0, indexOfChartId);

    this.setState({ charts });
    this.setState({ chartList: newChartList });
  }

  _getColumnAndRowCount() {
    return {
      columnCount: this.state.columnCount,
      rowCount: this.state.rowList.length
    }
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
      const { startingX, startingY } = this.state.cells[originCell];

      return (
        <Chart
          key={index}
          id={chartInfo.id}
          chartType={chartInfo.chartType}
          originCell={chartInfo.startingCell}
          startingX={startingX}
          startingY={startingY}
          isOccupied={this._isCellOccupied}
          getDOMLocationOfCell={this._getDOMLocationOfCell}
          occupyCell={this._occupyCell}
          unoccupyCell={this._unoccupyCell}
          removeChart={this._removeChart}
          getColumnAndRowCount={this._getColumnAndRowCount}
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
