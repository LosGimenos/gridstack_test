import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Resizable, ResizableBox } from 'react-resizable';

export default class Chart extends Component {
  constructor() {
    super();
    this.id = 0,
    this.chartType = 'Pie Chart'
  }

  _style() {
    return {
      border: '1px solid black',
      backgroundColor: '#7f5',
      width: '100%',
      height: '100%',
      borderRadius: '30px',
      textAlign: 'center'
    };
  }

  render() {
    return (
      <ResizableBox width={200} height={200}
        minConstraints={[100, 100]} maxConstraints={[300, 300]}>
      <div
        className='chart'
        style={this._style()}
        draggable='true'
        >
        <button className="button__cell--clear">X</button>
        <span><p>Pie Style: { this.chartType }</p></span>
        <span><p>id: { this.id }</p></span>
      </div>
      </ResizableBox>
    );
  }
}
