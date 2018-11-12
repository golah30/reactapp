import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
// import PrivateRoute from '../../PrivateRoute';
import styled from 'styled-components';
import Header from '../../Header';
import Footer from '../../Footer';
import MainPage from '../MainPage';
import Post from '../Post';
import HelpAdmin from '../HelpAdmin';

export class Help extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route path="/help" exact component={MainPage} />
          <Route path="/help/admin" exact component={HelpAdmin} />
          <Route path="/help/:id" component={Post} />
        </Switch>
        <OffsetBlock />
        <Footer />
      </Fragment>
    );
  }
}

const OffsetBlock = styled.div`
  height: 200px;
`;

export default Help;
