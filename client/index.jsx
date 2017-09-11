import React from 'react';
import { render } from 'react-dom';
import Routes from './routes/routes.jsx';
import '../dist/dragula.css';

render(<Routes />, document.querySelector('#root'));

if (module.hot) {
  module.hot.accept();
}
