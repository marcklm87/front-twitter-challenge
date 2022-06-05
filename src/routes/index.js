import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from '../components/Main';


const index = () => (
  <>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/home" component={Main} />
      <Redirect from="*" to="/404" />
    </Switch>
  </>
);

export default index;
