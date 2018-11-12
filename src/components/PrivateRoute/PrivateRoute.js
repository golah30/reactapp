import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends React.PureComponent {
  render() {
    const { isAuthorized, component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          isAuthorized ? <Component {...props} /> : <Redirect to="/auth" />
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  isAuthorized: state.Auth.Auth
});

export default connect(mapStateToProps)(PrivateRoute);
