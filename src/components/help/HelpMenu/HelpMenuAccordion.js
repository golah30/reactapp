import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AnimateHeight from 'react-animate-height';

class HelpMenuAccordion extends React.PureComponent {
  state = {
    height: 0
  };
  handleClick = async () => {
    await this.setState({ height: this.state.height === 0 ? 'auto' : 0 });
  };
  render = () => {
    const { category } = this.props;
    return (
      <Category>
        <CategoryTitle
          isActive={this.state.height === 0 ? false : true}
          onClick={this.handleClick}
        >
          {category.title}
        </CategoryTitle>
        <AnimateHeight duration={500} height={this.state.height}>
          <ListWrap>
            {category.posts.length !== 0
              ? category.posts.map((post, key) => (
                  <Post key={key}>
                    <PostLink to={`/help/${post._id}`}>{post.title}</PostLink>
                  </Post>
                ))
              : 'No posts in this category'}
          </ListWrap>
        </AnimateHeight>
      </Category>
    );
  };
}
const Category = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  margin-bottom: 10px;
`;
const CategoryTitle = styled.h4`
  margin: 0;
  padding: 0;
  text-align: center;
  border: 2px solid #1675d1;
  padding: 10px 15px;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  color: ${props => (props.isActive === true ? '#072643' : '#fbfdff')};
  background-color: ${props =>
    props.isActive === true ? '#d8e9fb' : '#1675d1'};
  cursor: pointer;
  transition: color 0.4s, background-color 0.3s;
  &:hover {
    color: #072643;
    background-color: transparent;
  }
`;
const ListWrap = styled.div``;
const Post = styled.li`
  width: 100%;
`;
const PostLink = styled(Link)`
  box-sizing: border-box;
  padding: 7px 10px;
  display: block;
  width: 100%;
  text-decoration: none;
  color: #072643;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  font-style: italic;
  transition: background-color 0.3s;
  &:hover {
    background-color: #c6e0f9;
  }
`;
export default HelpMenuAccordion;
