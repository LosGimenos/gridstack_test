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
        '15': {
          id: 15,
          canAddChart: true
        },
        '16': {
          id: 16,
          canAddChart: true
        },
        '17': {
          id: 17,
          canAddChart: true
        },
        '18': {
          id: 18,
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
        },
        '25': {
          id: 25,
          canAddChart: true
        },
        '26': {
          id: 26,
          canAddChart: true
        },
        '27': {
          id: 27,
          canAddChart: true
        },
        '28': {
          id: 28,
          canAddChart: true
        },
        '31': {
          id: 31,
          canAddChart: true
        },
        '32': {
          id: 32,
          canAddChart: true
        },
        '33': {
          id: 33,
          canAddChart: true
        },
        '34': {
          id: 34,
          canAddChart: true
        },
        '35': {
          id: 35,
          canAddChart: true
        },
        '36': {
          id: 36,
          canAddChart: true
        },
        '37': {
          id: 37,
          canAddChart: true
        },
        '38': {
          id: 38,
          canAddChart: true
        },
        '41': {
          id: 41,
          canAddChart: true
        },
        '42': {
          id: 42,
          canAddChart: true
        },
        '43': {
          id: 43,
          canAddChart: true
        },
        '44': {
          id: 44,
          canAddChart: true
        },
        '45': {
          id: 45,
          canAddChart: true
        },
        '46': {
          id: 46,
          canAddChart: true
        },
        '47': {
          id: 47,
          canAddChart: true
        },
        '48': {
          id: 48,
          canAddChart: true
        },
      },
      chartList: [],
      charts: {},
      rows: {
        '1': {
          id: 1,
          cellsInRow: [11,12,13,14,15,16,17,18]
        },
        '2': {
          id: 2,
          cellsInRow: [21,22,23,24,25,26,27,28]
        },
        '3': {
          id: 3,
          cellsInRow: [31,32,33,34,35,36,37,38]
        },
        '4': {
          id: 4,
          cellsInRow: [41,42,43,44,45,46,47,48]
        }
      },
      rowList: [1,2,3,4],
      columnCount: 8
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
    this._findPositionInRow = this._findPositionInRow.bind(this);
    this._findPositionInColumn = this._findPositionInColumn.bind(this);
    this._getCellRect = this._getCellRect.bind(this);
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
      const { startingX, startingY } = this.state.cells[originCell];

      return (
        <Chart
          key={chartInfo.id}
          id={chartInfo.id}
          chartType={chartInfo.chartType}
          originCell={chartInfo.startingCell}
          startingX={startingX}
          startingY={startingY}
          getCellRect={this._getCellRect}
          isOccupied={this._isCellOccupied}
          getDOMLocationOfCell={this._getDOMLocationOfCell}
          occupyCell={this._occupyCell}
          unoccupyCell={this._unoccupyCell}
          removeChart={this._removeChart}
          findPositionInRow={this._findPositionInRow}
          findPositionInColumn={this._findPositionInColumn}
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
