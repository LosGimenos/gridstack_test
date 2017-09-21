import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Rnd from 'react-rnd';

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.id;
    this.chartType = this.props.chartType;

  }

  componentDidMount() {
    const thisChart = findDOMNode(this);
    console.log(thisChart.getBoundingClientRect());
  }

  _style() {
    return {
      postion: 'absolute',
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
      <Rnd
        default={{
          x: this.props.startingX - 25 || 0,
          y: this.props.startingY - 50 || 0,
          width: 100,
          height: 100
        }}
      >
        <div
          style={this._style()}
          >
          <button className="button__cell--clear">X</button>
          <span><p>Pie Style: { this.chartType }</p></span>
          <span><p>id: { this.id }</p></span>
        </div>
      </Rnd>
    );
  }
}
