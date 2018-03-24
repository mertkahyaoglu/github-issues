import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './Main';

export default class App extends Component {
  render() {
    return (
      <Main>
        <Switch>
          <Route path="/" component={Main} />
        </Switch>
      </Main>
    );
  }
}
