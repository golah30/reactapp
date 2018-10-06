import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../Header';
import Footer from '../../Footer';
import MainPage from '../MainPage';
import Post from '../Post';

export class Help extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route path="/help" exact component={MainPage} />
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
