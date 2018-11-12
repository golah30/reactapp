import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import Footer from '../Footer';
import { authRequest, authLogoutRequest } from '../../ducks/Auth';
class Auth extends React.PureComponent {
  state = {
    login: '',
    password: ''
  };
  render = () => {
    return this.renderForm();
  };
  renderForm = () => {
    const { error, isFetching, authStatus } = this.props;
    if (isFetching) return this.loadingRender();
    return (
      <Fragment>
        <Header />
        {error ? (
          <p>
            При загрузке данных произошла ошибка. Code: {error.status}, Message:{' '}
            {error.message}
          </p>
        ) : null}
        <div>Authorize status: {authStatus.toString()}</div>
        <input
          type="text"
          name="login"
          placeholder="login"
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={this.handleChange}
        />
        <button
          disabled={this.state.password === '' || this.state.login === ''}
          onClick={this.handleClick}
        >
          Login
        </button>
        <button
          disabled={!this.props.isAuthorized}
          onClick={this.handleOutClick}
        >
          Logout{' '}
        </button>
        {error ? <p>При загрузке данных произошла ошибка</p> : null}
        {isFetching ? <p>Данные загружаются...</p> : null}
        <Footer />
      </Fragment>
    );
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleClick = () => {
    this.props.authRequest({
      email: this.state.login,
      password: this.state.password
    });
  };
  handleOutClick = () => {
    this.props.authLogoutRequest();
  };
  errorRender = () => <p>При загрузке данных произошла ошибка</p>;
  loadingRender = () => <p>Данные загружаются...</p>;
}

const mapStateToProps = state => ({
  isFetching: state.Auth.isFetching,
  authStatus: state.Auth.Auth,
  token: state.Auth.token,
  error: state.Auth.error
});
const mapDispatchToProps = { authRequest, authLogoutRequest };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
