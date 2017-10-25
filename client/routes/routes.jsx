import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../components/app.jsx';
import Drag from '../components/drag/drag.jsx';
import Matrix from '../components/matrix.jsx';
import JqRoot from '../components/jquery-test/jqRoot.jsx';
// import Header from '../components/header.jsx';
// import Results from '../components/results.jsx';

const Routes = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Matrix} />
      </Switch>
    </div>
  </Router>
);

export default Routes;
