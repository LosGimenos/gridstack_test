import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Chart from './chart.jsx';
import Cell from './cell.jsx';
import SelectChart from './SelectChart.jsx';
import interact from 'interactjs';

export default class MatrixCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasChart: this.props.hasChart,
      hasSharedChart: this.props.hasSharedChart,
      canAddChart: this.props.canAddChart,
      generatedCharts: []
    };
    this.id = this.props.cellId;

    this.updateMatrixCell = this.updateMatrixCell.bind(this);
    this.updateMatrixCellSelector = this.updateMatrixCellSelector.bind(this);
    this.addChartToMatrixCell = this.addChartToMatrixCell.bind(this);
  }

  componentDidMount() {
    interact(findDOMNode(this))
      .dropzone({
        overlap: 'center',
      })
      .on('drop', (event) => {
        this.setState({ canAddChart: false })
      })
      .on('dragleave', (event) => {
        this.setState({ canAddChart: true })
      })
  }

  updateMatrixCell() {
    console.log('ran update')
    this.setState({ hasChart: true });
  }

  updateMatrixCellSelector() {
    this.setState({ canAddChart: !this.state.canAddChart });
  }

  addChartToMatrixCell(chartId) {
    const chart = this.props.charts[chartId];
    const chartsInMatrixCell = this.state.generatedCharts;
    chartsInMatrixCell.push(chart);
    this.setState({ generatedCharts: chartsInMatrixCell });
    this.setState({ canAddChart: false });
  }

  renderSelector() {
    if (this.state.canAddChart) {
      return (
        <SelectChart
          setChartToCell={this.props.setChartToCell}
          cellId={this.id}
          addChart={this.props.addChart}
          updateMatrixCell={this.updateMatrixCell}
          updateMatrixCellSelector={this.updateMatrixCellSelector}
          addChartToMatrixCell={this.addChartToMatrixCell}
        />
      );
    }
  }

  renderCharts() {
      return this.state.generatedCharts.map((chart) => {
        return (
          <Chart
            chartId={chart.id}
            chartType={chart.chartType}
            checkHasChart={this.props.checkHasChart}
            setChartToCell={this.props.setChartToCell}
            checkHasSharedChart={this.props.checkHasSharedChart}
            setSharedChartToCell={this.props.setSharedChartToCell}
            checkNumRowsAndColumns={this.props.checkNumRowsAndColumns}
            clearCell={this.props.clearCell}
            updateMatrixCellSelector={this.updateMatrixCellSelector}
            updateMatrixCell={this.updateMatrixCell}
          />
        );
    })
  }

  render() {
    console.log('cell rendered', this.state.canAddChart)
    return (
      <div className='matrix-cell'>
        { this.renderSelector() }
        { this.renderCharts() }
        <Cell
          cellId={this.id}
        />
      </div>
    );
  }
}
