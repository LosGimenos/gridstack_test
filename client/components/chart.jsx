import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Resizable, ResizableBox } from 'react-resizable';

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.id;
    this.chartType = this.props.chartType
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
      <ResizableBox
        width={200}
        height={200}
        minConstraints={[100, 100]}
        maxConstraints={[300, 300]}
        draggableOpts={{grid: [50,50]}}
        >
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
