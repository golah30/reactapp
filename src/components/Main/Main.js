import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

class Main extends Component {
  render() {
    return (
      <Fragment>
        <Header>{}</Header>
        <Link to="/methods">Next to the Methods page</Link>
        <Footer>{}</Footer>
      </Fragment>
    );
  }
}

export default Main;
