import React, { Component } from 'react';
import ActionButton from './button.jsx';
import Selector from './selector.jsx';
import { findDOMNode } from 'react-dom';

export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canAddChart: true
    };
    this.cellId = this.props.cellId;

    this.setChartToCell = this.setChartToCell.bind(this);
  }

  componentDidMount() {
    const cell = findDOMNode(this);
    const cellLocation = cell.getBoundingClientRect();
    const x = cellLocation.left;
    const y = cellLocation.top;

    this.props.setStartingDOMLocation(this.cellId, x, y);
  }

  setChartToCell(chartType) {
    this.setState({ canAddChart: false });
    this.props.addChart(chartType, this.cellId);
  }

  renderSelector() {
    return this.state.canAddChart &&
      <Selector
        setChartToCell={this.setChartToCell}
      />
  }

  render() {
    return (
      <div
        className="matrix-cell">
        { this.renderSelector() }
        <span>Id: { this.cellId }</span>
      </div>
    );
  }
}
