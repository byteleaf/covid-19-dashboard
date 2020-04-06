import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Page from '../../pages/Page';
import Start from '../../pages/Start';

const Router = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Start} />
      <Route path="/page" component={Page} />
    </Switch>
  </HashRouter>
);

export default Router;
