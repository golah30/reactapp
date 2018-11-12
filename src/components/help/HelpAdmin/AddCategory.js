import React from 'react';
import styled from 'styled-components';
import { TextInput, Button } from '../../UI';
import { addCategory } from '../../../api';

export class AddCategory extends React.PureComponent {
  state = {
    disabled: false,
    category: ''
  };
  render() {
    return (
      <Container>
        <TextInput
          title={'Введите название категории'}
          name="category"
          limit={100}
          value={this.state.category}
          change={this.handleChange}
        />
        <Button
          title="Save"
          disabled={this.state.category === '' ? true : this.state.disabled}
          click={this.handleClick}
        />
      </Container>
    );
  }
  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };
  handleClick = async () => {
    await this.setState({ disabled: true });

    if (this.state.category !== '') {
      await addCategory(this.state.category, this.props.token);
      this.props.updList();
    }

    this.setState({ disabled: false });
  };
}

const Container = styled.div``;
export default AddCategory;
