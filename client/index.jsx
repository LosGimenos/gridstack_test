import React from 'react';
import { render } from 'react-dom';
import Matrix from './components/matrix.jsx';
import '../dist/matrix.css';

render(<Matrix />, document.querySelector('#root'));

if (module.hot) {
  module.hot.accept();
}
