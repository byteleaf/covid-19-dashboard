import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Page from '../../pages/Page';
import Start from '../../pages/Start';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Start} />
      <Route path="/page" component={Page} />
    </Switch>
  </BrowserRouter>
);

export default Router;
