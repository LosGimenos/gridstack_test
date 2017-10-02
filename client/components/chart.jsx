import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Rnd from 'react-rnd';

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: this.props.startingX,
      y: this.props.startingY,
      w: this.props.getCellRect(this.props.originCell).width * .88,
      h: this.props.getCellRect(this.props.originCell).height * .91
    };
    this.id = this.props.id;
    this.originCell = this.props.originCell;
    this.originCells = [this.originCell];
    this.chartType = this.props.chartType;
    this.baseWidth = this.props.getCellRect(this.props.originCell).width;
    this.baseHeight = this.props.getCellRect(this.props.originCell).height;
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

  _checkForOverlap(e) {
    let chart = e.target;
    let chartLocation;

    console.log('check overlap for clear', chart.tagName);
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
      this.originalCell = anchorCell;
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
        console.log(this.state.x, this.state.y)
        return;
      }
    }
    console.log(this.originalCell, 'on finished drag')
    const anchorCell = Math.min.apply(null, overlappedCells);
    this.originCell = anchorCell;
  }

  _checkForDefaultSize() {
    return (this.state.w == this.baseWidth && this.state.h == this.baseHeight) ? true : false;
  }

  _checkAvailableMatrixSize(cellId) {
    const availableWidthIndex = this.props.findPositionInRow(cellId) + 1;
    const availableHeightIndex = this.props.findPositionInColumn(cellId) + 1;

    const currentWidthIndex = parseInt((this.state.w / this.baseWidth).toString().split('')[0]);
    const currentHeightIndex = parseInt((this.state.h / this.baseHeight).toString().split('')[0]);

    return (availableWidthIndex < currentWidthIndex || availableHeightIndex < currentHeightIndex) ? false : true;
  }

  _checkResizeOverlap(e, delta) {
    const startingWidth = this.state.w;
    const startingHeight = this.state.h;
    let chart;

    try {
      chart = e.target.parentElement.parentElement;
    } catch (err) {
      console.log(err);
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
        console.log('same width');
        if (this.state.h + delta.height > startingHeight) {
          this._setHeight(overlappedCells, 'bigger');
        } else if (this.state.h + delta.height < startingHeight) {
          this._setHeight(overlappedCells, 'smaller');
        }
        this.setState({ w: this.state.w + delta.width });
      } else if (startingHeight == this.state.h + delta.height) {
        console.log('same height');
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
    this.originalCell = anchorCell;
    console.log(this.originCell, 'on finished resize', overlappedCells)
  }

  _startDragEvent(e) {
    this.originCells = [];
    let chart = e.target;
    console.log(chart.className, 'start drag event element')

    if (chart.className == 'not-selectable') {
      chart = e.target.parentElement.parentElement.parentElement;
      console.log('this is now the chart', chart)
    } else if (chart.className == 'button__cell--clear') {
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
    console.log('origin cells on drag start', this.originCells, 'this was a drag and this is the origin cell', this.originCell);
  }

  _startResizeEvent(e) {
    this.originCells = [];
    const chart = e.target.parentElement.parentElement;

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
    console.log(this.originCells, 'this was a resize and this is the origin cell', this.originCell);
  }

  _checkIsOriginCell(cellId, originCells) {
    return originCells.includes(cellId);
  }

  _resetPosition(x, y) {
    this.setState({ x, y });
  }

  _setWidth(overlappedCells, smallerOrBigger) {
    const { columns } = this._checkPositionInRowAndColumn(overlappedCells);
    console.log(columns, 'beginning of setWidth')
    let minWidthModifier = columns;

    switch (smallerOrBigger) {
      case 'smaller': {
        if (minWidthModifier == 0) {
          minWidthModifier = 1;
        }
        console.log('its smaller');
        break;
      }
      case 'bigger': {
        console.log('bigger fired')
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

    console.log(minWidth, minWidthModifier, maxWidthModifier, 'the width')
    this.setState({ w: minWidth });
  }

  _setHeight(overlappedCells, smallerOrBigger) {
    const { rows } = this._checkPositionInRowAndColumn(overlappedCells);
    console.log(rows);
    let minHeightModifier = rows;
    console.log(rows, 'beginning of setHeight')
    switch (smallerOrBigger) {
      case 'smaller': {
        if (minHeightModifier == 0) {
          minHeightModifier = 1;
        }
        console.log('its smaller');
        break;
      }
      case 'bigger': {
        console.log('bigger fired')
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

    console.log(minHeight, minHeightModifier, maxHeightModifier, 'the height')
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

  _style() {
    return {
      postion: 'absolute',
      border: '2px solid white',
      backgroundColor: '#4C99E8',
      opacity: '.95',
      width: '100%',
      height: '100%',
      borderRadius: '30px',
      textAlign: 'center'
    };
  }

  _clearChart(e) {
    // this._startDragEvent(e);
    console.log('on clear these are the origin cells', this.originCells)
    this.props.removeChart(this.id);
    this.originCells.forEach((cell) => {
      this.props.unoccupyCell(cell);
    })
  }

  render() {
    return (
      <Rnd
        size={{ width: this.state.w, height: this.state.h }}
        position={{ x: this.state.x - (this.baseWidth * 3.25), y: this.state.y - (this.baseHeight * 1.85) }}
        onDragStart={(e, d) => { this._startDragEvent(e) }}
        onDragStop={(e, d) => { this._checkForOverlap(e) }}
        onResizeStart={(e, direction, ref, delta, position) => {
          this._startResizeEvent(e);
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
      >
        <div
          style={this._style()}
          name={this.id}
          >
          <button
            className="button__cell--clear"
            onClick={(e) => {
              this._clearChart(e);
              e.stopPropagation();
            }}>X</button>
          <span className="not-selectable"><p className="not-selectable">Pie Style: { this.chartType }</p></span>
          <span><p className="not-selectable">id: { this.id }</p></span>
        </div>
      </Rnd>
    );
  }
}
