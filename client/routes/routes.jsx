import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../components/app.jsx';
import Matrix from '../components/matrix.jsx';
// import Header from '../components/header.jsx';
// import Results from '../components/results.jsx';

const Routes = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/matrix-test" component={Matrix} />
      </Switch>
    </div>
  </Router>
);

export default Routes;
