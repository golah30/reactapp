import React from 'react';
import styled from 'styled-components';
import { Button } from '../../UI';
import AddCategory from './AddCategory';
import AddPost from './AddPost';

export class Add extends React.PureComponent {
  state = {
    category: false,
    post: false
  };
  render() {
    return (
      <Container>
        <Controls>
          <Button title="Add Category" click={this.handleCategoryClick} />
          <Button title="Add Post" click={this.handlePostClick} />
        </Controls>
        {this.state.category && (
          <AddCategory updList={this.props.updList} token={this.props.token} />
        )}
        {this.state.post && (
          <AddPost
            updList={this.props.updList}
            token={this.props.token}
            categories={this.props.categories}
          />
        )}
      </Container>
    );
  }
  handleCategoryClick = () => {
    this.setState({ category: true, post: false });
  };
  handlePostClick = () => {
    this.setState({ category: false, post: true });
  };
}

const Container = styled.div``;
const Controls = styled.div``;
export default Add;
