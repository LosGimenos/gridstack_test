import React from 'react';
import { render } from 'react-dom';
import Matrix from './components/matrix.jsx';
import '../dist/matrix.css';
import $ from 'jquery';
import { get_initial_matrix_state } from './core_api.jsx';

//Ajax call to get state info
var slide_id = $('#slide-id').val();
if (slide_id == null){
    var domain_prefix = 'https://pangea-staging.herokuapp.com';
    var slide_id = 55;
    var user_id = 2;
}
else {
    if ($('#domain-prefix').val() == '127.0.0.1:8000'){
        var domain_prefix = 'http://' + $('#domain-prefix').val();
    }
    else {
        var domain_prefix = 'https://' + $('#domain-prefix').val();
    }
    var user_id = $('#user-id').val();
}

function renderInitialMatrix(json,domain_prefix,slide_id,user_id) {
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
              slideID={slide_id}
              domainPrefix={domain_prefix}
              userID={user_id}
          />,
          document.querySelector('#root'));
  }
  else {
    render(<Matrix/>, document.querySelector('#root'));
  }
}

get_initial_matrix_state(renderInitialMatrix, domain_prefix, slide_id, user_id);

if (module.hot) {
  module.hot.accept();
}
