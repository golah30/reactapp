import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { helpCategoriesRequest } from '../../../ducks/HELP';
import { SubHeader } from '../../UI';
import { EditableEntity } from './EditableEntity';
import { CATEGORIES } from '../../../api';
import Add from './Add';

export class HelpAdmin extends React.PureComponent {
  componentWillMount() {
    this.props.helpCategoriesRequest(CATEGORIES);
  }
  render() {
    const { error, isFetching, result } = this.props;

    if (error) return this.errorRender();
    if (isFetching) return this.loadingRender();
    return (
      <Fragment>
        <SubHeader title={'Редактирование раздела "Справка"'} />
        <Materials>
          {result.data &&
            result.data.categories.map((item, key) => {
              return (
                <Fragment key={item._id}>
                  <EditableEntity
                    type="category"
                    token={this.props.token}
                    title={item.title}
                    childs={item.posts}
                    _id={item._id}
                    updList={this.updateList}
                  />
                  {item.posts.lenght !== 0 ? (
                    <Fragment>
                      {item.posts.map((post, key) => {
                        return (
                          <EditableEntity
                            type="post"
                            title={post.title}
                            _id={post._id}
                            categoryId={post.categoryId}
                            token={this.props.token}
                            key={post._id}
                            updList={this.updateList}
                          />
                        );
                      })}
                    </Fragment>
                  ) : null}
                </Fragment>
              );
            })}
        </Materials>
        <Add
          updList={this.updateList}
          token={this.props.token}
          categories={result.data && result.data.categories}
        />
      </Fragment>
    );
  }
  errorRender = () => <p>При загрузке данных произошла ошибка</p>;
  loadingRender = () => <p>Данные загружаются...</p>;
  updateList = () => {
    this.props.helpCategoriesRequest(CATEGORIES);
  };
}

const Materials = styled.div`
  margin: 0 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const mapStateToProps = state => ({
  isFetching: state.HELP.isCategoryFetching,
  result: state.HELP.categoriesResult,
  error: state.HELP.categoryError,
  isAuthorized: state.Auth.Auth,
  token: state.Auth.token
});
const mapDispatchToProps = { helpCategoriesRequest };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HelpAdmin);
