import React from 'react';
import styled from 'styled-components';
import { Editor } from '@tinymce/tinymce-react';
import { TextInput, Button } from '../../UI';
import { addPost } from '../../../api';

export class AddPost extends React.PureComponent {
  state = {
    disabled: false,
    post: '',
    categoryId: ''
  };
  render() {
    const { categories } = this.props;
    return (
      <Container>
        <TextInput
          title={'Введите заголовок'}
          name="post"
          limit={100}
          value={this.state.post}
          change={this.handleChange}
        />
        <CategoriesContainer>
          <Title>Выберите категорию</Title>
          {categories.map((item, key) => {
            return (
              <Category
                key={item._id}
                id={item._id}
                onClick={this.handleCategoryClick}
                isActive={this.state.categoryId === item._id}
              >
                {item.title}
              </Category>
            );
          })}
        </CategoriesContainer>
        <Editor
          apiKey="15214ikl578n4swfgq01i22a92t6nrc4nk4xvke8nul0ejdi"
          initialValue={''}
          init={{
            height: 500,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor textcolor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            menubar: false,
            toolbar:
              'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat'
          }}
          onChange={this.handleEditorChange}
        />
        <Button
          title="Save"
          disabled={
            this.state.post === '' ||
            this.state.categoryId === '' ||
            this.state.content === ''
              ? true
              : this.state.disabled
          }
          click={this.handleClick}
        />
      </Container>
    );
  }
  handleEditorChange = e => {
    this.setState({ content: e.target.getContent() });
  };
  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };
  handleCategoryClick = e => {
    this.setState({ categoryId: e.target.getAttribute('id') });
  };
  handleClick = async () => {
    await this.setState({ disabled: true });

    if (
      this.state.post !== '' &&
      this.state.content !== '' &&
      this.state.categoryId !== ''
    ) {
      await addPost(
        {
          title: this.state.post,
          content: this.state.content,
          categoryId: this.state.categoryId
        },
        this.props.token
      );
      this.props.updList();
    }

    this.setState({ disabled: false });
  };
}

const Container = styled.div`
  padding: 0 100px;
`;
const Category = styled.div`
  margin-bottom: 5px;
  text-align: center;
  border: 2px solid #1675d1;
  padding: 10px 15px;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  background-color: ${props =>
    props.isActive === true ? 'transparent' : '#1675d1'};
  color: ${props => (props.isActive === true ? '#072643' : '#fbfdff')};
  user-select: none;
  cursor: pointer;
  transition: color 0.4s, background-color 0.3s;

  &:hover {
    color: #072643;
    background-color: transparent;
  }
`;
const Title = styled.div`
  margin-bottom: 10px;
`;
const CategoriesContainer = styled.div``;
export default AddPost;
