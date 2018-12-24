import React from 'react';
import styled from 'styled-components';
import Pallete from '../../colors';

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
  width: 500px;
`;
const Heading = styled.div`
  text-align: center;
  font-size: 20px;
  margin-bottom: 8px;
`;
const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 5px 12px;
  border-radius: 3px;
  border: 2px solid ${Pallete.blue};
  text-align: center;
  outline: none;
  font-size: 18px;
`;
const Restriction = styled.div`
  text-align: center;
  margin-top: 5px;
  font-size: 14px;
`;
