import React, { Fragment } from 'react';
import styled from 'styled-components';
import EditCategory from './EditCategory';
import EditPost from './EditPost';
import { Button as UIButton } from '../../UI';
import { putCategory, putPost, deletePost, deleteCategory } from '../../../api';

export class EditableEntity extends React.Component {
  state = {
    edit: false,
    title: '',
    disabled: false,
    newCategoryTitle: '',
    newPostTitle: '',
    newPostContent: ''
  };

  render() {
    const { type, title, _id } = this.props;

    return (
      <Entity ref={_id}>
        <MainContainer>
          {this.state.title ? (
            <Title>{this.state.title}</Title>
          ) : (
            <Title>{title}</Title>
          )}
          <Controls>
            <Button onClick={this.edit} disabled={this.state.disabled}>
              Edit
            </Button>
            <Button onClick={this.handleDelete} disabled={this.state.disabled}>
              Delete
            </Button>
          </Controls>
        </MainContainer>
        {this.state.edit && type === 'category' ? (
          <Fragment>
            <EditCategory change={this.handleCategoryChange} />
            <UIButton
              title="Save"
              click={this.handleCategorySave}
              disabled={this.state.disabled}
            />
          </Fragment>
        ) : null}
        {this.state.edit && type === 'post' ? (
          <Fragment>
            <EditPost id={_id} change={this.handlePostChange} />
            <UIButton
              title="Save"
              click={this.handlePostSave}
              disabled={this.state.disabled}
            />
          </Fragment>
        ) : null}
      </Entity>
    );
  }
  edit = () => {
    this.setState({ edit: !this.state.edit });
  };

  handleCategoryChange = e => {
    this.setState({ newCategoryTitle: e.target.value });
  };
  handlePostChange = data => {
    this.setState({ newPostTitle: data.title, newPostContent: data.content });
  };
  handleCategorySave = async () => {
    const { _id, token } = this.props;
    await this.setState({ disabled: true });
    if (
      this.state.newCategoryTitle !== this.state.title &&
      this.state.newCategoryTitle !== ''
    ) {
      await putCategory(_id, token, {
        title: this.state.newCategoryTitle
      });
    }
    this.setState({ title: this.state.newCategoryTitle, disabled: false });
  };
  handlePostSave = async () => {
    const { _id, token } = this.props;
    await this.setState({ disabled: true });

    await putPost(_id, token, {
      title: this.state.newPostTitle,
      categoryId: this.props.categoryId,
      content: this.state.newPostContent
    });

    this.setState({ title: this.state.newPostTitle, disabled: false });
  };
  handleDelete = async () => {
    const { _id, token, type } = this.props;
    await this.setState({ disabled: true });

    if (type === 'post') {
      await deletePost(_id, token);
      this.props.updList();
    }

    if (type === 'category') {
      if (this.props.childs.length === 0) {
        await deleteCategory(_id, token);
        this.props.updList();
      } else {
        console.log('В категории есть материалы.');
      }
    }
  };
}

const Entity = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MainContainer = styled.div`
  min-width: 300px;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div``;
const Controls = styled.div``;
const Button = styled.button``;

export default EditableEntity;
