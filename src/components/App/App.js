import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Promo from '../Promo';
import Main from '../Main';
import Help from '../help/Help';
import Methods from '../Methods';
import NotFound from '../NotFound';
import AHP from '../AHP';
import WSM from '../WSM';
import Auth from '../Auth';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route path="/" exact component={Promo} />
          <Route path="/main" component={Main} />
          <Route path="/help" component={Help} />
          <Route path="/methods" component={Methods} />
          <Route path="/ahp" component={AHP} />
          <Route path="/wsm" component={WSM} />
          <Route path="/auth" component={Auth} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
