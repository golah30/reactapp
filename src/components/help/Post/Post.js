import React, { Fragment } from 'react';
import { connect } from 'react-redux';
// import styled from 'styled-components';
import { SubHeader } from '../../UI';
import { helpPostsRequest } from '../../../ducks/HELP';
import { POSTS } from '../../../api';

class Post extends React.PureComponent {
  componentWillMount() {
    this.props.helpPostsRequest(`${POSTS}/${this.props.match.params.id}`);
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
  isFetching: state.HELP.isPostsFetching,
  result: state.HELP.postsResult,
  error: state.HELP.postsError
});
const mapDispatchToProps = { helpPostsRequest };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
