import React from 'react';
import Chart from './chart.jsx';
import PropTypes from 'prop-types';

const propTypes = {
  copyCell: PropTypes.func
}

const Cell = ({ title,
                hasChart,
                chart,
                chartId,
                cellId,
                rowId,
                formula,
                charts,
                copyCell,
                cellsInRow,
                collectHoveredCells,
                copyFromHover,
                clearCell,
                addChart,
                setChartToCell }) => (
  <div
    className='cell'
    name={cellId}
    onDragStart={(event) => {
        event.dataTransfer.setData('masterCell', cellId);
      }
    }
    onDragOver={(event)=> {
      event.preventDefault();
    }}
    onDragEnter={(event) => {
      event.preventDefault();
      collectHoveredCells(cellId);
    }}
    onDrop={(event) => {
      event.preventDefault();
      const masterCell = event.dataTransfer.getData('masterCell');
      copyFromHover(masterCell);
    }}
  >
    { !hasChart &&
      <select
        className="button__cell--import"
        name='add-chart'
        defaultValue='Add'
        onChange={(event) => {
          setChartToCell(cellId, addChart(event.target.value))
        }}
      >
        <option>ADD</option>
        <option value='pie'>Pie Chart</option>
        <option value='bar'>Bar Graph</option>
      </select>
    }
    {
      hasChart &&
      <Chart
        chartId={chartId}
        chartType={charts[chartId]['chartType']}
      />
    }
    <span><h2>{ cellId }</h2></span>
  </div>
);

Cell.propTypes = propTypes;
export default Cell;
