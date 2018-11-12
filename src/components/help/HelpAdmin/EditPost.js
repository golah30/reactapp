import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { helpPostsRequest } from '../../../ducks/HELP';
import { POSTS } from '../../../api';

export class EditPost extends React.PureComponent {
  state = {
    title: '',
    content: ''
  };
  componentWillMount() {
    this.props.helpPostsRequest(`${POSTS}/${this.props.id}`);
  }
  componentDidUpdate(prevProps) {
    if (this.props.result !== prevProps.result && this.props.result.data) {
      this.setState(
        {
          title: this.props.result.data.post.title,
          content: this.props.result.data.post.content
        },
        () => {
          this.props.change({
            title: this.state.title,
            content: this.state.content
          });
        }
      );
    }
  }
  render() {
    const { error, isFetching, result } = this.props;
    if (error) return this.errorRender();
    if (isFetching) return this.loadingRender();

    return (
      <Edit>
        <Label>Введите название материала:</Label>
        <Input
          type="text"
          defaultValue={result.data && result.data.post.title}
          onChange={this.handleChange}
        />
        <Editor
          apiKey="15214ikl578n4swfgq01i22a92t6nrc4nk4xvke8nul0ejdi"
          initialValue={result.data && result.data.post.content}
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
      </Edit>
    );
  }
  errorRender = () => <p>При загрузке данных произошла ошибка</p>;
  loadingRender = () => <p>Данные загружаются...</p>;
  handleChange = e => {
    this.setState({ title: e.target.value }, () => {
      this.props.change({
        title: this.state.title,
        content: this.state.content
      });
    });
  };
  handleEditorChange = e => {
    this.setState({ content: e.target.getContent() }, () => {
      this.props.change({
        title: this.state.title,
        content: this.state.content
      });
    });
  };
}
const Edit = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.input``;
const Label = styled.label``;

const mapStateToProps = state => ({
  isFetching: state.HELP.isPostsFetching,
  result: state.HELP.postsResult,
  error: state.HELP.postsError
});
const mapDispatchToProps = { helpPostsRequest };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPost);
