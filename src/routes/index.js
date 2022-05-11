import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import home from '../components/LoginRegister';
import BooksList from '../components/BooksTable';


const index = () => (
  <>
    <Switch>
      <Route exact path="/" component={home} />
      <Route exact path="/books" component={BooksList} />
      <Redirect from="*" to="/404" />
    </Switch>
  </>
);

export default index;
