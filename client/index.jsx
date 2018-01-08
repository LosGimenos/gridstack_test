import React from 'react';
import { render } from 'react-dom';
import Matrix from './components/matrix.jsx';
import '../dist/matrix.css';

//Ajax call to get state info

render(<Matrix />, document.querySelector('#root'));

if (module.hot) {
  module.hot.accept();
}
