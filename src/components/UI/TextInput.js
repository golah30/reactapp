import React from 'react';
import styled from 'styled-components';

export default class TextInput extends React.PureComponent {
  handleChange = e => {
    const { limit, change } = this.props;

    if (e.target.value.length <= limit) {
      if (change) change(e.target.name, e.target.value);
    }
  };

  render() {
    const { limit, title, value, name } = this.props;
    return (
      <Container>
        <Heading>{title}</Heading>
        <Input
          type="text"
          name={name}
          value={value ? value : ''}
          onChange={this.handleChange}
        />
        <Restriction>До {limit} символов</Restriction>
      </Container>
    );
  }
}
/*  simple usage - <TextInput title={'asd'} limit={100} change={this.handleChange} /> */

const Container = styled.div`
  margin-bottom: 50px;
  max-width: 600px;
`;
const Heading = styled.div`
  font-size: 20px;
  margin-bottom: 8px;
`;
const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 2px 12px;
  border: none;
  border-bottom: 2px solid #f25c5f;
  outline: none;
  font-size: 18px;
`;
const Restriction = styled.div`
  margin-top: 5px;
  font-size: 14px;
`;
