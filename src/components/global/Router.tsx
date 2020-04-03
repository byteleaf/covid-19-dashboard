import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Page from '../../pages/Page';

const Router = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Page} />
      <Route path="/page" component={Page} />
    </Switch>
  </HashRouter>
);

export default Router;
