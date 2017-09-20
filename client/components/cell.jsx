import React, { Component } from 'react';
import ActionButton from './button.jsx';
import Selector from './selector.jsx';

export default class Cell extends Component {
  constructor() {
    super();
    this.state = {
      canAddChart: true
    };

    this.setChartToCell = this.setChartToCell.bind(this);
  }

  setChartToCell(chartType) {
    this.setState({ canAddChart: false });
    this.props.addChart(chartType);
  }

  renderSelector() {
    return this.state.canAddChart &&
      <Selector
        setChartToCell={this.setChartToCell}
      />
  }

  render() {
    return (
      <div className="matrix-cell">
        { this.renderSelector() }
        <span>Id: { this.props.cellId }</span>
      </div>
    );
  }
}
