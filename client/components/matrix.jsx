import React, { Component } from 'react';
import Chart from './chart.jsx';
import Row from './row.jsx';
import ActionButton from './button.jsx';
import { add_row, add_col, add_chart, remove_chart, replicate_chart } from '../core_api.jsx';

export default class Matrix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: this.props.cells,
      chartList: this.props.chartList,
      charts: this.props.charts,
      rows: this.props.rows,
      rowList: this.props.rowList,
      columnCount: this.props.columnCount,
      rowCount: this.props.rowCount
    };
    this.hasRendered = false;
    this.columnLimit = 8;
    this.rowLimit = 6;
    this.slideID = this.props.slideID;
    this.domainPrefix = this.props.domainPrefix;
    this.userID = this.props.userID;

    this.addChart = this.addChart.bind(this);
    this.setChartObjectId = this.setChartObjectId.bind(this);
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
    this._swapChartId = this._swapChartId.bind(this);
  }

  componentDidMount() {
    this.hasRendered = true;
    this.renderCharts();
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

  addChart(cellId, row=1, column=1, clonedTo=null, originalObjectId=null) {
    let highestId;
    const chartList = this.state.chartList;
    const charts = this.state.charts;
    const cells = this.state.cells;

    if (chartList.length == 0 ) {
      highestId = 0;
    } else {
        highestId = Math.max.apply(null, Object.keys(this.state.charts));
    }

    charts[highestId + 1] = {
      id: highestId + 1,
      startingCell: cellId,
      startingRowSpan: row,
      startingColumnSpan: column
    }

    if (clonedTo) {
      charts[highestId + 1]['clonedTo'] = highestId + 1;
    }

    chartList.push(highestId + 1);
    cells[cellId]['canAddChart'] = false;

    const newChartId = highestId + 1;

    if (clonedTo) {
      replicate_chart(this.setChartObjectId, this.domainPrefix, this.slideID, cellId, originalObjectId, newChartId, this.userID, cells, charts, chartList);
    }
    else {
      add_chart(this.setChartObjectId, this.domainPrefix, this.slideID, cellId, newChartId, this.userID, cells, charts, chartList);
    }
    // this.setState({ cells });
    // this.setState({ charts });
    // this.setState({ chartList });

    const chartId = highestId + 1;
    return { chartId };
  }

  // Callback to add backend objectId to chart once ajax call has completed
  setChartObjectId(newChartId,objectId,cells,charts,chartList) {
    // const charts = this.state.charts;
    // const chartList = this.state.chartList;
    console.log("Setting chart object id");
    console.log(objectId);
    charts[newChartId]['objectID'] = objectId;
    console.log(charts[newChartId]['objectID']);
    this.setState({ charts });
    this.setState({ chartList });
    this.setState({ cells });
    console.log(charts[newChartId]['objectID']);
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

    add_col(this.domainPrefix,this.slideID);
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

    add_row(this.domainPrefix,this.slideID);
    this.updateCellLocations();

  }

  addToRowCount() {
    this.setState({ rowCount: this.state.rowCount + 1 });
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
    let indexOfChartId;
    let chartToDelete = charts[chartId];

    const current_chart = charts[chartId];
    if (current_chart.objectID) {
        remove_chart(this.domainPrefix, current_chart.objectID, this.userID);
    }

    delete charts[chartId];
    indexOfChartId = chartList.indexOf(chartId);
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

  _swapChartId(newerChartId, olderChartId) {
    const charts = this.state.charts;
    // charts[olderChartId]['id'] = newerChartId;
    // charts[newerChartId]['id'] = olderChartId;

    charts[olderChartId]['clonedFrom'] = olderChartId;

    this.setState({ charts });
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
      let startingColumnSpan = 1;
      let startingRowSpan = 1;
      let startingWidth;
      let startingHeight;

      if (chartInfo.startingColumnSpan != 1) {
        const width = this._getCellRect(chartInfo.startingCell).width;
        const paddingInWidth = width * .13

        startingWidth = ( width * chartInfo.startingColumnSpan ) - paddingInWidth;
      } else {
        startingWidth = (this._getCellRect(chartInfo.startingCell).width * chartInfo.startingColumnSpan) * .88;
      }

      if (chartInfo.startingRowSpan != 1) {
        const height = this._getCellRect(chartInfo.startingCell).height;
        const paddingInHeight = height * .08;

        startingHeight = ( height * chartInfo.startingRowSpan ) - paddingInHeight;
      } else {
        startingHeight = (this._getCellRect(chartInfo.startingCell).height * chartInfo.startingRowSpan) * .91;
      }

      return (
        <Chart
          key={chartId}
          id={chartInfo.id}
          originCell={chartInfo.startingCell}
          startingX={x}
          startingY={y}
          startingWidth={startingWidth}
          startingHeight={startingHeight}
          startingColumnSpan={startingColumnSpan}
          startingRowSpan={startingRowSpan}
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
          swapChartId={this._swapChartId}
          objectID={chartInfo.objectID}
          domainPrefix={this.domainPrefix}
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
          buttonText={'Add Col'}
          buttonAction={this.addColumn}
        />
        { this.renderRows() }
        { this.hasRendered ? this.renderCharts() : null }
      </div>
    );
  }
}
