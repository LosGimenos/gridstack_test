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
var initial_state = get_initial_matrix_state(domain_prefix, slide_id);
console.log(initial_state.result);

render(<Matrix />, document.querySelector('#root'));

if (module.hot) {
  module.hot.accept();
}
