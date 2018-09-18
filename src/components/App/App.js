import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Promo from '../Promo';
import Main from '../Main';
import Methods from '../Methods';
import NotFound from '../NotFound';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Promo} />
        <Route path="/main" component={Main} />
        <Route path="/methods" component={Methods} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default App;
