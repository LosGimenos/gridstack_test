import React from 'react';

const SelectChart = ({ setChartToCell, cellId, addChart, updateMatrixCell, updateMatrixCellSelector, addChartToMatrixCell }) => (
  <select
    className="button__cell--import"
    name='add-chart'
    defaultValue='Add'
    onChange={(event) => {
      const chartId = addChart(event.target.value)
      setChartToCell(cellId, chartId);
      addChartToMatrixCell(chartId);
      updateMatrixCell();
    }}
  >
    <option>ADD</option>
    <option value='pie'>Pie Chart</option>
    <option value='bar'>Bar Graph</option>
  </select>
);

export default SelectChart;
