import React, { Fragment } from 'react';
import { connect } from 'react-redux';
// import styled from 'styled-components';
import { SubHeader } from '../../UI';
import { helpRequest } from '../../../ducks/HELP';

class Post extends React.PureComponent {
  componentWillMount() {
    this.props.helpRequest(
      `http://localhost:3000/api/posts/${this.props.match.params.id}`
    );
  }
  render = () => {
    const { error, isFetching, result } = this.props;

    if (error) return this.errorRender();
    if (isFetching) return this.loadingRender();
    if (!result.data || !result.data.post) return this.loadingRender();
    return (
      <Fragment>
        <SubHeader title={result.data.post.title} />
        <div dangerouslySetInnerHTML={{ __html: result.data.post.content }} />
      </Fragment>
    );
  };

  errorRender = () => <p>При загрузке данных произошла ошибка</p>;
  loadingRender = () => <p>Данные загружаются...</p>;
}

const mapStateToProps = state => ({
  isFetching: state.HELP.isFetching,
  result: state.HELP.result,
  error: state.HELP.error
});
const mapDispatchToProps = { helpRequest };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
