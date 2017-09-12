import React, { Component } from 'react';
import Cell from './cell.jsx';

export default class Row extends Component {
  constructor(props) {
    super(props);
  }

  renderCells() {
    return this.props.cellsInRow.map((cell) => {
      return (
        <Cell
          title={cell.title}
          formula={cell.formula}
          cellId={cell.id}
          chart={cell.chartType}
          chartId={cell.chartId}
          hasChart={cell.hasChart}
          addCell={this.props.addCell}
          cellsInRow={this.props.cellsInRow}
          rowId={this.props.rowId}
          copyCell={this.props.copyCell}
          collectHoveredCells={this.props.collectHoveredCells}
          copyFromHover={this.props.copyFromHover}
          clearCell={this.props.clearCell}
          addChart={this.props.addChart}
          setChartToCell={this.props.setChartToCell}
          charts={this.props.charts}
        />
      );
    })
  }

  render() {
    return (
      <div className='row'>
        { this.renderCells() }
      </div>
    );
  }
}

