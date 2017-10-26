import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Rnd from 'react-rnd';
import matrixSizeModifiers from '../matrixSizeModifiers.js';

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: this.props.startingX,
      y: this.props.startingY,
      w: this.props.startingWidth,
      h: this.props.startingHeight,
      columnCount: this.props.columnCount,
      rowCount: this.props.rowCount,
      onCloneDrag: false
    };
    this.id = this.props.id;
    this.originCell = this.props.originCell;
    this.originCells = [this.originCell];
    this.baseWidth = this.props.getCellRect(this.props.originCell).width;
    this.baseHeight = this.props.getCellRect(this.props.originCell).height;
    this.heightCorrected = true;
    this.clonedChartId = null;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.columnCount != this.state.columnCount) {
      const { width, height, top, left } = this.props.getCellRect(this.originCell);
      const chartWidthDifference = this.state.w * this._getCellSizeDifference(this.baseWidth, width);
      const chartHeightDifference = this.state.h * this._getCellSizeDifference(this.baseHeight, height);
      const chartWidth = this.state.w - chartWidthDifference;
      const chartHeight = this.state.h - chartHeightDifference;

      this.setState({ columnCount: nextProps.columnCount });
      this.setState({ w: chartWidth });
      this.setState({ h: chartHeight });
      this.setState({ x: left });
      this.setState({ y: top });

      this.baseWidth = width;
      this.baseHeight = height;
    } else if (nextProps.rowCount != this.state.rowCount) {
      this.setState({ rowCount: nextProps.rowCount });
      this.heightCorrected = false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.rowCount != this.state.rowCount && !this.heightCorrected) {
      let { width, height, top, left } = this.props.getCellRect(this.originCell);

      const chartWidthDifference = this.state.w * this._getCellSizeDifference(this.baseWidth, width);
      const chartHeightDifference = this.state.h * this._getCellSizeDifference(this.baseHeight, height);

      const chartWidth = this.state.w - chartWidthDifference;
      const chartHeight = this.state.h - chartHeightDifference;

      this.setState({ x: left });
      this.setState({ y: top });
      this.setState({ w: chartWidth });
      this.setState({ h: chartHeight });
      this.heightCorrected = true;

      this.baseWidth = width;
      this.baseHeight = height;
    }
  }

  _getCellSizeDifference(baseCellSize, newCellSize) {
    const cellSizeDifference = ((baseCellSize - newCellSize) / baseCellSize);
    return cellSizeDifference;
  }

  _checkCollision(x, y) {
    const chartLocation = {
      right: x + this.state.w,
      top: y,
      bottom: y + this.state.h,
      left: x + 5
    }

    const cells = document.querySelectorAll('.matrix-cell');
    const overlappedCells = [];
    let onOccupiedCell = false;

    cells.forEach((cell) => {
      const cellLocation = cell.getBoundingClientRect();
      const overlap = !(chartLocation.right < cellLocation.left ||
            chartLocation.left > cellLocation.right ||
            chartLocation.bottom < cellLocation.top ||
            chartLocation.top > cellLocation.bottom)

      if (overlap) {
        const cellId = cell.getAttribute('name');
        overlappedCells.push(cellId);
        const isOccupied = this.props.isOccupied(cellId);

        if (isOccupied && (this._checkIsOriginCell(cellId.toString(), this.originCells) == false)) {
          onOccupiedCell = true;
        }
      }
    })

    return { 'onOccupiedCellOnRelocate': onOccupiedCell, 'overlappedCellsOnRelocate': overlappedCells };
  }

  _checkCloneDropCollision() {

    this._checkCollision(x, y);
  }

  _clearClonedChartOnError() {
    this.props.removeChart(this.clonedChartId);
    this.clonedChartId = null;
  }

  _checkForOverlap(e) {
    let chart = e.target;
    let chartLocation;

    if (chart.tagName == 'HTML' || chart.tagName == 'document' || chart.tagName == 'BUTTON') {
      return;
    }

    if (chart.className == 'not-selectable') {
      chart = e.target.parentElement.parentElement.parentElement;
    }

    try {
      chartLocation = chart.getBoundingClientRect();
    } catch (err) {
      return;
    }

    const cells = document.querySelectorAll('.matrix-cell');
    const overlappedCells = [];
    let onOccupiedCell = false;

    cells.forEach((cell) => {
      const cellLocation = cell.getBoundingClientRect();
      const overlap = !(chartLocation.right < cellLocation.left ||
            chartLocation.left > cellLocation.right ||
            chartLocation.bottom < cellLocation.top ||
            chartLocation.top > cellLocation.bottom)

      if (overlap) {
        const cellId = cell.getAttribute('name');
        overlappedCells.push(cellId);
        const isOccupied = this.props.isOccupied(cellId);

        if (isOccupied && (this._checkIsOriginCell(cellId.toString(), this.originCells) == false)) {
          onOccupiedCell = true;
        }
      }
    })

    if (!onOccupiedCell && overlappedCells.length >= 2 && this._checkForDefaultSize()) {
      return;
    }

    if (!onOccupiedCell && overlappedCells.length >= 2) {
      let remainingOriginCells = this.originCells;
      const anchorCell = Math.min.apply(null, overlappedCells);

      if (!this._checkAvailableMatrixSize(anchorCell)) {
        return;
      }
      const { x, y } = this.props.getDOMLocationOfCell(anchorCell);
      this._resetPosition(x,y);
      const { onOccupiedCellOnRelocate, overlappedCellsOnRelocate } = this._checkCollision(x, y);

      overlappedCellsOnRelocate.forEach((cell) => {
        if (!this._checkIsOriginCell(cell, this.originCells)) {
          this.props.occupyCell(cell);
        } else {
          remainingOriginCells = remainingOriginCells.filter((value) => {
            return value != cell;
          })
        }
      })
      remainingOriginCells.forEach((cell) => {
        this.props.unoccupyCell(cell);
      })
      this.originCell = anchorCell;
    } else if (!onOccupiedCell && overlappedCells.length <= 1) {
      try {
        const anchorCell = Math.min.apply(null, overlappedCells);

        if (!this._checkAvailableMatrixSize(anchorCell)) {
          return;
        }
        const { x, y } = this.props.getDOMLocationOfCell(anchorCell);
        this._resetPosition(x,y);
        this.props.unoccupyCell(this.originCell);
        this.props.occupyCell(anchorCell);
        this.originCell = anchorCell;
      } catch (err) {
        const { x, y } = this.props.getDOMLocationOfCell(this.originCell);
        this._resetPosition(x, y);
        return;
      }
    }
    const anchorCell = Math.min.apply(null, overlappedCells);
    this.originCell = anchorCell;
  }

  _checkForDefaultSize() {
    return (this.state.w == this.baseWidth && this.state.h == this.baseHeight) ? true : false;
  }

  _checkAvailableMatrixSize(cellId) {
    const availableWidthIndex = this.props.findPositionInRow(cellId) + 1;
    const availableHeightIndex = this.props.findPositionInColumn(cellId) + 1;

    const currentWidthIndex = Math.ceil(this.state.w / this.baseWidth);
    const currentHeightIndex = Math.ceil(this.state.h / this.baseHeight);

    return (availableWidthIndex < currentWidthIndex || availableHeightIndex < currentHeightIndex) ? false : true;
  }

  _checkResizeOverlap(e, delta) {
    const startingWidth = this.state.w;
    const startingHeight = this.state.h;
    let chart;

    try {
      chart = e.target.parentElement.parentElement;
    } catch (err) {
      return;
    }

    if (!chart.className.match('draggable')) {
      return;
    }

    const chartLocation = chart.getBoundingClientRect();
    const cells = document.querySelectorAll('.matrix-cell');
    const overlappedCells = [];
    let onOccupiedCell = false;

    cells.forEach((cell) => {
      const cellId = cell.getAttribute('name');
      const cellLocation = cell.getBoundingClientRect();
      const overlap = !(chartLocation.right < cellLocation.left ||
            chartLocation.left > cellLocation.right ||
            chartLocation.bottom < cellLocation.top ||
            chartLocation.top > cellLocation.bottom);

      if (overlap) {
        overlappedCells.push(cellId);
        const isOccupied = this.props.isOccupied(cellId);

        if (isOccupied && (this._checkIsOriginCell(cellId.toString(), this.originCells) == false)) {
          onOccupiedCell = true;
        }
      }
    })

    let remainingOriginCells = this.originCells;
    const anchorCell = Math.min.apply(null, overlappedCells);

    if (!onOccupiedCell && overlappedCells.length >= 1) {
      if (startingWidth == this.state.w + delta.width) {
        if (this.state.h + delta.height > startingHeight) {
          this._setHeight(overlappedCells, 'bigger');
        } else if (this.state.h + delta.height < startingHeight) {
          this._setHeight(overlappedCells, 'smaller');
        }
        this.setState({ w: this.state.w + delta.width });
      } else if (startingHeight == this.state.h + delta.height) {
        if (this.state.w + delta.width > startingWidth) {
          this._setWidth(overlappedCells, 'bigger');
        } else if (this.state.w + delta.width < startingWidth) {
          this._setWidth(overlappedCells, 'smaller');
        }
        this.setState({ h: this.state.h + delta.height });
      }
      overlappedCells.forEach((cell) => {
        this.props.occupyCell(cell);
        remainingOriginCells = remainingOriginCells.filter((value) => {
          return value != cell;
        })
      })
      remainingOriginCells.forEach((cell) => {
        this.props.unoccupyCell(cell);
      })
    }
    this.originCell = anchorCell;
  }

  _checkCloneOverlap(e) {
    let chart = e.target;
    let chartLocation;

    if (chart.tagName == 'HTML' || chart.tagName == 'document' || chart.tagName == 'BUTTON') {
      this._clearClonedChartOnError();
      return;
    }

    if (chart.className == 'not-selectable') {
      chart = e.target.parentElement.parentElement.parentElement;
    }

    try {
      chartLocation = chart.getBoundingClientRect();
    } catch (err) {
      this._clearClonedChartOnError;
      return;
    }


    const cells = document.querySelectorAll('.matrix-cell');
    const overlappedCells = [];
    let onOccupiedCell = false;

    cells.forEach((cell) => {
      const cellLocation = cell.getBoundingClientRect();
      const overlap = !(chartLocation.right < cellLocation.left ||
            chartLocation.left > cellLocation.right ||
            chartLocation.bottom < cellLocation.top ||
            chartLocation.top > cellLocation.bottom)

      if (overlap) {
        const cellId = cell.getAttribute('name');
        overlappedCells.push(cellId);
        const isOccupied = this.props.isOccupied(cellId);

        if (isOccupied) {
          onOccupiedCell = true;
        }
      }
    })

    if (onOccupiedCell) {
      this._clearClonedChartOnError();
      return;
    } else {
      try {
        let remainingOriginCells = this.originCells;
        const anchorCell = Math.min.apply(null, overlappedCells);

        if (!this._checkAvailableMatrixSize(anchorCell)) {
          this._clearClonedChartOnError();
          return;
        }
        const { x, y } = this.props.getDOMLocationOfCell(anchorCell);
        this._resetPosition(x,y);
        const { onOccupiedCellOnRelocate, overlappedCellsOnRelocate } = this._checkCollision(x, y);

        overlappedCellsOnRelocate.forEach((cell) => {
          if (!this._checkIsOriginCell(cell, this.originCells)) {
            this.props.occupyCell(cell);
          }

          this.originCell = anchorCell;
        })
      } catch(err) {
        this._clearClonedChartOnError();
        return;
      }
    }
  }

  _startDragEvent(e) {
    this.originCells = [];
    let chart = e.target;

    if (chart.className == 'not-selectable') {
      chart = e.target.parentElement.parentElement.parentElement;
    } else if (chart.className == 'button__cell--clear' || chart.className == 'button__cell--clone') {
      chart = e.target.parentElement.parentElement;
    }

    const chartLocation = chart.getBoundingClientRect();
    const cells = document.querySelectorAll('.matrix-cell');
    const overlappedCells = [];

    cells.forEach((cell) => {
      const cellId = cell.getAttribute('name');
      const cellLocation = cell.getBoundingClientRect();
      const overlap = !(chartLocation.right < cellLocation.left ||
            chartLocation.left > cellLocation.right ||
            chartLocation.bottom < cellLocation.top ||
            chartLocation.top > cellLocation.bottom);

      if (overlap) {
        overlappedCells.push(cellId);
      }
    })
    this.originCells = overlappedCells;
  }

  _startResizeEvent(e) {
    this.originCells = [];
    // const chart = e.target.parentElement.parentElement;
    // const chart = e.target.parentElement.parentElement.firstChild;
    const chart = e;

    const chartLocation = chart.getBoundingClientRect();

    const cells = document.querySelectorAll('.matrix-cell');
    const overlappedCells = [];

    cells.forEach((cell) => {
      const cellId = cell.getAttribute('name');
      const cellLocation = cell.getBoundingClientRect();
      const overlap = !(chartLocation.right < cellLocation.left ||
            chartLocation.left > cellLocation.right ||
            chartLocation.bottom < cellLocation.top ||
            chartLocation.top > cellLocation.bottom);

      if (overlap) {
        overlappedCells.push(cellId);
      }
    })
    this.originCells = overlappedCells;

  }

  _checkIsOriginCell(cellId, originCells) {
    return originCells.includes(cellId);
  }

  _resetPosition(x, y) {
    this.setState({ x, y });
  }

  _setWidth(overlappedCells, smallerOrBigger) {
    const { columns } = this._checkPositionInRowAndColumn(overlappedCells);
    let minWidthModifier = columns;

    switch (smallerOrBigger) {
      case 'smaller': {
        if (minWidthModifier == 0) {
          minWidthModifier = 1;
        }
        break;
      }
      case 'bigger': {
        if (minWidthModifier == 0 || minWidthModifier == 1) {
          minWidthModifier = 2;
        }
      }
    }

    const paddingInWidth = this.baseWidth * .13;
    const maxWidthModifier = this.props.findPositionInRow(this.originCell);

    if (maxWidthModifier == 0 ) {
      return
    } else if (minWidthModifier > maxWidthModifier) {
      minWidthModifier = maxWidthModifier + 1;
    }

    let minWidth = (this.baseWidth * minWidthModifier) - paddingInWidth;

    this.setState({ w: minWidth });
  }

  _setHeight(overlappedCells, smallerOrBigger) {
    const { rows } = this._checkPositionInRowAndColumn(overlappedCells);
    let minHeightModifier = rows;
    switch (smallerOrBigger) {
      case 'smaller': {
        if (minHeightModifier == 0) {
          minHeightModifier = 1;
        }
        break;
      }
      case 'bigger': {
        if (minHeightModifier == 0 || minHeightModifier == 1) {
          minHeightModifier = 2;
        }
      }
    }

    const paddingInHeight = this.baseHeight * .08;
    const maxHeightModifier = this.props.findPositionInColumn(this.originCell);

    if (maxHeightModifier == 0 ) {
      return
    } else if (minHeightModifier > maxHeightModifier) {
      minHeightModifier = maxHeightModifier + 1;
    }

    let minHeight = (this.baseHeight * minHeightModifier) - paddingInHeight;

    this.setState({ h: minHeight });
  }

  _checkPositionInRowAndColumn(overlappedCells) {
    const columnsAndRows = {
      columns: 0,
      rows: 0
    }

    let columnMatcher;
    let rowMatcher;

    overlappedCells.forEach((cellId) => {
      const rowIndex = parseInt(cellId.toString().split('')[0]);

      if (!rowMatcher || rowMatcher == rowIndex) {
        if (columnsAndRows['columns']) {
          columnsAndRows['columns'] = columnsAndRows['columns'] + 1;
        } else {
            rowMatcher = rowIndex;
            columnsAndRows['columns'] = 1;
        }
      }

      if (rowIndex != columnMatcher) {
        columnMatcher = rowIndex;
        if (columnsAndRows['rows']) {
          columnsAndRows['rows'] = columnsAndRows['rows'] + 1;
        } else {
          columnsAndRows['rows'] = 1;
        }
      }
    })

    return columnsAndRows;
  }

  _cloneChart(e) {
    const clonedChartLocation = [];
    const { columns, rows } = this._checkPositionInRowAndColumn(this.originCells);
    let onOccupiedCell = false;
    let noCellExists = false;

    this.originCells.forEach((cell) => {
      const potentialCell = parseInt(cell) + columns;
      clonedChartLocation.push(potentialCell);
      let isOccupied;
      try {
        isOccupied = this.props.isOccupied(potentialCell);
      } catch (err) {
        noCellExists = true;
      }

      if (isOccupied) {
        onOccupiedCell = true;
      }
    })

    if (onOccupiedCell || noCellExists) {
      return;
    } else {
      const anchorCell = Math.min.apply(0, clonedChartLocation);
      this.props.addChart(anchorCell, rows, columns);
      clonedChartLocation.forEach((cell) => {
        this.props.occupyCell(cell);
      })
    }
  }

  _copyChart(e) {
    this.setState({ onCloneDrag: true });
    this._startDragEvent(e);

    const { columns, rows } = this._checkPositionInRowAndColumn(this.originCells);
    const { chartId } = this.props.addChart(this.originCell, rows, columns, true);
    this.props.swapChartId(chartId, this.id);
    this.id = this.props.id;
    this.clonedChartId = chartId;
  }

  _style() {
    return {
      postion: 'absolute',
      border: '2px solid white',
      backgroundColor: '#4C99E8',
      opacity: '.97',
      width: '100%',
      height: '100%',
      borderRadius: '30px',
      textAlign: 'center',
    };
  }

  _cloneDragStyle() {
    return {
      postion: 'absolute',
      border: '2px solid white',
      backgroundColor: 'yellow',
      opacity: '.97',
      width: '100%',
      height: '100%',
      borderRadius: '30px',
      textAlign: 'center'
    }
  }

  _clearChart(e) {
    let chartIdToRemove = this.id;
    this.props.removeChart(chartIdToRemove);
    this.originCells.forEach((cell) => {
      this.props.unoccupyCell(cell);
    })
  }
// - (this.baseWidth * matrixSizeModifiers['columns'][this.state.columnCount])
// - (this.baseHeight * matrixSizeModifiers['rows'][this.state.rowCount])

  render() {
    let matrix = document.querySelector('.matrix');
    let cell = document.getElementsByName(this.originCell)[0];

    return (
      <Rnd
        size={{ width: this.state.w, height: this.state.h }}
        position={{ x: this.state.x + (cell.offsetWidth / 16), y: this.state.y + (cell.offsetHeight / 32) }}
        onDragStart={(e, d) => { !e.shiftKey ? this._startDragEvent(e) : this._copyChart(e) }}
        onDragStop={(e, d) => {
          this.state.onCloneDrag ? this._checkCloneOverlap(e) : this._checkForOverlap(e);
          this.setState({ onCloneDrag: false })
        }}
        onResizeStart={(e, direction, ref, delta, position) => {
          this._startResizeEvent(ref);
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          this._checkResizeOverlap(e, delta);
        }}
        enableResizing={{
          bottom: true,
          bottomLeft: false,
          bottomRight: false,
          left: false,
          right: true,
          top: false,
          topLeft: false,
          topRight: false
        }}
        z={this.state.onCloneDrag ? 100 : 1}
      >
        <div
          className={'chart'}
          style={this.state.onCloneDrag ? this._cloneDragStyle() : this._style()}
          name={this.id}
          >
          <button
            className="button__cell--clear"
            onClick={(e) => {
              this._clearChart(e);
            }}><p className='not-selectable'>x</p></button>
          <span><p className="not-selectable">id: { this.id }</p></span>
        </div>
      </Rnd>
    );
  }
}
