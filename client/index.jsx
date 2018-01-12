import React from 'react';
import { render } from 'react-dom';
import Matrix from './components/matrix.jsx';
import '../dist/matrix.css';
import $ from 'jquery';
import get_initial_matrix_state from './core_api.jsx';

//Ajax call to get state info
// var slide_id = $('#slide-id').val();
// var domain_prefix = $('#domain-prefix').val();
var domain_prefix = '127.0.0.1:8000';
console.log(domain_prefix);
var slide_id = 14;

function renderInitialMatrix(json) {
  console.log(json);
  if (json.result == 'Success') {
      var chartList = json.chartList;
      var rowList = json.rowList;
      render(
          <Matrix
              cells={json.cells}
              chartList={chartList}
              charts={json.charts}
              rows={json.rows}
              rowList={rowList}
              columnCount={json.col_count}
              rowCount={json.row_count}
          />,
          document.querySelector('#root'));
  }
  else {
    render(<Matrix/>, document.querySelector('#root'));
  }
}

get_initial_matrix_state(renderInitialMatrix, domain_prefix, slide_id);

if (module.hot) {
  module.hot.accept();
}
