import React, { Component } from 'react';
// import Cell from './cell.jsx';
import MatrixCell from './matrixCell.jsx';

export default class Row extends Component {
  constructor(props) {
    super(props);
  }

  renderCells() {
    return this.props.cellsInRow.map((cell) => {
      return (
        <MatrixCell
          cellId={cell.id}
          chartId={cell.chartId}
          hasChart={cell.hasChart}
          hasSharedChart={cell.hasSharedChart}
          canAddChart={cell.canAddChart}
          addCell={this.props.addCell}
          cellsInRow={this.props.cellsInRow}
          rowId={this.props.rowId}
          clearCell={this.props.clearCell}
          addChart={this.props.addChart}
          setChartToCell={this.props.setChartToCell}
          charts={this.props.charts}
          checkHasChart={this.props.checkHasChart}
          setSharedChartToCell={this.props.setSharedChartToCell}
          checkHasSharedChart={this.props.checkHasSharedChart}
          checkNumRowsAndColumns={this.props.checkNumRowsAndColumns}
          updateCells={this.props.updateCells}
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

