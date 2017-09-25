import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Rnd from 'react-rnd';

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: this.props.startingX,
      y: this.props.startingY,
      w: 300,
      h: 225
    };
    this.id = this.props.id;
    this.originCell = this.props.originCell;
    this.originCells = [this.originCell];
    this.chartType = this.props.chartType;
  }

  _checkForOverlap(e) {
    const chart = e.target;
    if (chart.tagName == 'HTML') {
      return;
    }

    const chartLocation = chart.getBoundingClientRect();
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

    if (!onOccupiedCell && overlappedCells.length >= 2) {
      console.log('greater than 2', overlappedCells)
      let remainingOriginCells = this.originCells;
      const anchorCell = Math.min.apply(null, overlappedCells);
      const { x, y } = this.props.getDOMLocationOfCell(anchorCell);
      this._resetPosition(x,y);
      overlappedCells.forEach((cell) => {
        if (!this._checkIsOriginCell(cell, this.originCells)) {
          this.props.occupyCell(cell);
        } else {
          console.log(remainingOriginCells)
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
      console.log('one or less')
      const anchorCell = Math.min.apply(null, overlappedCells);
      const { x, y } = this.props.getDOMLocationOfCell(anchorCell);
      this._resetPosition(x,y);
      this.props.unoccupyCell(this.originCell);
      this.props.occupyCell(anchorCell);
      this.originCell = anchorCell;
      console.log('single item move', this.originCell)
    } else {
      console.log('nope')
    }
    console.log('drag ended', this.state.x, this.state.y, this.originCell)
  }

  _checkResizeOverlap(e, delta) {
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
      this.setState({ w: this.state.w + delta.width, h: this.state.h + delta.height });
      overlappedCells.forEach((cell) => {
        this.props.occupyCell(cell);
        remainingOriginCells = remainingOriginCells.filter((value) => {
          return value != cell;
        })
      })
    }
    remainingOriginCells.forEach((cell) => {
      this.props.unoccupyCell(cell);
    })
    this.originalCell = anchorCell;
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
  }

  _checkIsOriginCell(cellId, originCells) {
    return originCells.includes(cellId);
  }

  _resetPosition(x, y) {
    this.setState({ x, y });
  }

  _setWidthAndHeight(width, height) {
    const { columnCount, rowCount } = this.props.getColumnAndRowCount;

  }

  _style() {
    return {
      postion: 'absolute',
      border: '2px solid white',
      backgroundColor: '#7f5',
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
        position={{ x: this.state.x - 60, y: this.state.y - 40}}
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
