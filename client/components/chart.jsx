import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import interact from 'interactjs';

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      h: 130,
      w: 130,
      rowsInMatrix: this.props.checkNumRowsAndColumns().rowCount,
      columnsInMatrix: this.props.checkNumRowsAndColumns().columnCount
    };
    this.id = this.props.chartId;
    this.chartType = this.props.chartType;
    this.maxHeight = 200 * (this.state.rowsInMatrix + 1);
    this.maxWidth = 200 * (this.state.columnsInMatrix + 1);
    this.startingChartLocationOnDragStart = null;

    this._onMove = this._onMove.bind(this);
  }

  componentDidMount() {
    interact(findDOMNode(this))
      .draggable({
        onmove: this._onMove,
        restrict: {
          restriction: '.matrix',
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        snap: {
          targets: [
            interact.createSnapGrid({ x: 30, y: 30 })
          ],
          range: Infinity
        }
      })
      .resizable({
        edges: {
          top: false,
          left: false,
          bottom: false,
          right: '.sizer-nodule'
        }
      })
      .on('dragstart', (event) => {
        const startingChartLocationOnDragStart = event.target.getBoundingClientRect();
        this.startingChartLocationOnDragStart = startingChartLocationOnDragStart;
      })
      .on('dragend', (event) => {
        this._onEnd(event);
        this.startingChartLocationOnDragStart = null;
      })
      .on('resizemove', (event) => {
        this._onResizeMove(event);
      })
      .on('resizeend', (event) => {
        this._restrictSize();
        const chartSize = event.target.getBoundingClientRect();
        const cells = document.querySelectorAll('.cell');

        cells.forEach((cell) => {
          const cellSize = cell.getBoundingClientRect();
          const overlap = !(chartSize.right < cellSize.left ||
                chartSize.left > cellSize.right ||
                chartSize.bottom < cellSize.top ||
                chartSize.top > cellSize.bottom)

          if (overlap) {
            const cellId = cell.getAttribute('name');
            const hasChart = this.props.checkHasChart(cellId);
            const hasSharedChart = this.props.checkHasSharedChart(cellId)

            if (!hasChart && !hasSharedChart) {
              console.log('dont have chart')
              this.props.setSharedChartToCell(cellId, this.id)
            }
          }
        })
      })
  }

  _setMaxHeightAndWidth() {
    this.maxHeight = 130 * this.state.rowsInMatrix;
    this.maxWidth = 215 * this.state.columnsInMatrix;
  }

  _style() {
    return {
      transform: `translate(${this.state.x}px, ${this.state.y}px)`,
      position: 'absolute',
      width: `${this.state.w}px`,
      height: `${this.state.h}px`,
      border: '1px solid black',
      backgroundColor: 'DarkSeaGreen',
      touchAction: 'none',
      zIndex: 5,
      borderRadius: '10px'
    }
  }

  _onMove(e) {
    this.setState({
      x: this.state.x + e.dx,
      y: this.state.y + e.dy
    })
  }

  _onEnd(event) {
    const chartSize = event.target.getBoundingClientRect();
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell) => {
      const cellSize = cell.getBoundingClientRect();
      const overlap = !(chartSize.right < cellSize.left ||
            chartSize.left > cellSize.right ||
            chartSize.bottom < cellSize.top ||
            chartSize.top > cellSize.bottom)

      if (overlap) {
        const cellId = cell.getAttribute('name');
        const hasChart = this.props.checkHasChart(cellId);
        const hasSharedChart = this.props.checkHasSharedChart(cellId)

        if (!hasChart && !hasSharedChart) {
          console.log('dont have chart')
          this.props.setSharedChartToCell(cellId, this.id);
          this._clearStartingChartLocation(this.startingChartLocationOnDragStart);
        } else if (hasChart || hasSharedChart) {
          this.setState({ x: this.startingChartLocationOnDragStart.left, y: this.startingChartLocationOnDragStart.top });
          this.startingChartLocationOnDragStart = null;
        }
      }
    })
  }

  _clearStartingChartLocation(element) {
    console.log('made it')
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      const cellSize = cell.getBoundingClientRect();
      const overlap = !(element.right < cellSize.left ||
            element.left > cellSize.right ||
            element.bottom < cellSize.top ||
            element.top > cellSize.bottom)

      if (overlap) {
        const cellId = cell.getAttribute('name');
        this.props.clearCell(cellId);
      }
    });
  }

  _onResizeMove(e) {
    let target = e.target,
      x = (parseFloat(target.getAttribute('data-x')) || 0),
      y = (parseFloat(target.getAttribute('data-y')) || 0);

    this.setState({
      h: this.state.h + (e.rect.height / 10),
      w: this.state.w + (e.rect.width / 10)
    })

    x += e.deltaRect.left;
    y += e.deltaRect.top;

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    this._restrictSize();
  }

  _restrictSize() {
    const width = this.state.w;
    const height = this.state.h;
    this.setState({
      rowsInMatrix: this.props.checkNumRowsAndColumns().rowCount,
      columnsInMatrix: this.props.checkNumRowsAndColumns().columnCount
    });

    this._setMaxHeightAndWidth();

    console.log(this.maxHeight, this.maxWidth)
    if (height > this.maxHeight) {
      this.setState({
        h: this.maxHeight
      })
    } else if (width > this.maxWidth) {
      this.setState({
        w: this.maxWidth
      })
    }
  }

  render() {
    return (
      <div className='chart' style={ this._style() }>
        <button className="button__cell--clear">X</button>
        <div className='sizer-nodule' />
        <span><p>{ this.props.chartType }</p></span>
        <span><p>id: { this.props.chartId }</p></span>
      </div>
    );
  }
}
