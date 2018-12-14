import React from 'react';
import styled from 'styled-components';

export default class Button extends React.PureComponent {
  render() {
    return (
      <StyledButton onClick={this.props.click} disabled={this.props.disabled}>
        {this.props.title}
      </StyledButton>
    );
  }
}

/* <Button
  disabled={false}
  click={() => {
    this.props.history.push('/ahp');
  }}
/> */
// simple usage
const StyledButton = styled.button`
  box-sizing: border-box;
  min-width: 175px;
  margin-bottom: 30px;
  padding: 11px 5px;
  transition: background-color 0.5s;
  text-align: center;
  text-transform: uppercase;
  color: #fafafa;
  border: none;
  border-radius: 9px;
  background-color: #ba2635;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  &:active {
    outline: none;
  }
  &:hover {
    outline: none;
    background-color: #f25c5f;
  }
  &:disabled {
    cursor: default;
    color: darkgrey;
    background-color: lightgrey;
  }
`;
