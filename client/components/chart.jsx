import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Rnd from 'react-rnd';

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: this.props.startingX,
      y: this.props.startingY,
      w: 110,
      h: 80
    };
    this.id = this.props.id;
    this.originCell = this.props.originCell;
    this.originCells = [this.originCell];
    this.chartType = this.props.chartType;
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
    const chart = e.target;
    let chartLocation;

    if (chart.tagName == 'HTML' || chart.tagName == 'document') {
      return;
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
    return (this.state.w == 110 && this.state.h == 80) ? true : false;
  }

  _checkAvailableMatrixSize(cellId) {
    const availableWidthIndex = this.props.findPositionInRow(cellId) + 1;
    const availableHeightIndex = this.props.findPositionInColumn(cellId) + 1;

    const currentWidthIndex = parseInt((this.state.w / 110).toString().split('')[0]);
    const currentHeightIndex = parseInt((this.state.h / 80).toString().split('')[0]);

    return (availableWidthIndex < currentWidthIndex || availableHeightIndex < currentHeightIndex) ? false : true;
  }

  _checkResizeOverlap(e, delta) {
    const startingWidth = this.state.w;
    const startingHeight = this.state.h;
    const chart = e.target.parentElement.parentElement;
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
        this._setHeight(this.state.h + delta.height);
        this.setState({ w: this.state.w + delta.width });
      } else if (startingHeight == this.state.h) {
        console.log('same height');
        if (this.state.w + delta.width > startingWidth) {
          this._setWidth(overlappedCells.length, 'bigger');
        } else if (this.state.w + delta.width < startingWidth) {
          this._setWidth(overlappedCells.length, 'smaller');
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
    const chart = e.target;
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
    console.log(this.originCells, 'this was a drag and this is the origin cell', this.originCell);
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

  _setWidth(width, smallerOrBigger) {
    // let minWidthModifier = parseInt((width / 70).toString()[0]);
    let minWidthModifier = width;

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

    const paddingInWidth = 15;
    const maxWidthModifier = this.props.findPositionInRow(this.originCell);

    if (maxWidthModifier == 0 ) {
      return
    } else if (minWidthModifier > maxWidthModifier) {
      minWidthModifier = maxWidthModifier + 1;
    }

    let minWidth = (131 * minWidthModifier) - paddingInWidth;
    if (minWidth < 195 && minWidth > 110) {
      minWidth = 110;
    }
    console.log(minWidth, minWidthModifier, maxWidthModifier, 'the width')
    this.setState({ w: minWidth });
  }

  _setHeight(height) {
    let minHeightModifier = parseInt((height / 250).toString()[0]) + 1;
    const paddingInHeight = 40;
    const maxHeightModifier = this.props.findPositionInColumn(this.originCell);

    if (maxHeightModifier == 0 ) {
      return
    } else if (minHeightModifier > maxHeightModifier) {
      minHeightModifier = maxHeightModifier + 1;
    }

    let minHeight = 225 * minHeightModifier + (paddingInHeight * minHeightModifier) - 10;
    if (minHeight < 300 && minHeight > 225) {
      minHeight = 225;
    }
    this.setState({ h: minHeight });
  }

  _style() {
    return {
      postion: 'absolute',
      border: '2px solid white',
      backgroundColor: '#4C99E8',
      opacity: '.8',
      width: '100%',
      height: '100%',
      borderRadius: '30px',
      textAlign: 'center'
    };
  }

  _clearChart(e) {
    this._startResizeEvent(e);
    this.props.removeChart(this.id);
    this.originCells.forEach((cell) => {
      this.props.unoccupyCell(cell);
    })
  }

  render() {
    return (
      <Rnd
        size={{ width: this.state.w, height: this.state.h }}
        position={{ x: this.state.x - 40, y: this.state.y - 15 }}
        onDragStart={(e, d) => { this._startDragEvent(e) }}
        onDragStop={(e, d) => { this._checkForOverlap(e) }}
        onResizeStart={(e, direction, ref, delta, position) => {
          this._startResizeEvent(e);
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          this._checkResizeOverlap(e, delta);
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
            }}>X</button>
          <span><p>Pie Style: { this.chartType }</p></span>
          <span><p>id: { this.id }</p></span>
        </div>
      </Rnd>
    );
  }
}
