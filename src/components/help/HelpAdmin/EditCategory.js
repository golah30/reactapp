import React from 'react';
import styled from 'styled-components';

export class EditCategory extends React.PureComponent {
  render() {
    return (
      <Edit>
        <Label>Введите название категории:</Label>
        <Input type="text" onChange={this.props.change} />
      </Edit>
    );
  }
}
const Edit = styled.div``;
const Input = styled.input``;
const Label = styled.label``;
export default EditCategory;
