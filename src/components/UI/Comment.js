import React from 'react';
import styled from 'styled-components';

export default class Comment extends React.PureComponent {
  state = {
    value: ''
  };
  handleChange = e => {
    this.setState({ value: e.target.value });
    if (this.props.change) this.props.change(e.target.value);
  };
  render() {
    return (
      <Container>
        <Heading>Комментарии:</Heading>

        <Input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <Restriction>До 100 символов</Restriction>
      </Container>
    );
  }
}

const Container = styled.div`
  margin-bottom: 50px;
  width: 576px;
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
