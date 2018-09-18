import React, { PureComponent, Fragment } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import MethodPageTitle from './MethodPageTitle';
import MethodList from './MethodsList';
import AltMethodList from './AltMethodsList';

class Methods extends PureComponent {
  state = {
    altView: false
  };

  handleView = altView => {
    this.setState({ altView: altView });
  };

  render() {
    return (
      <Fragment>
        <Header>{}</Header>
        <MethodPageTitle viewTogle={this.handleView}>{}</MethodPageTitle>
        {this.state.altView ? <AltMethodList /> : <MethodList />}
        <Footer>{}</Footer>
      </Fragment>
    );
  }
}

export default Methods;
