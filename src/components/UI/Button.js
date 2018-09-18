import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default class Button extends React.PureComponent {
  render() {
    return (
      <StyledButton onClick={this.props.click} disabled={this.props.disabled}>
        button
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
  width: 175px;
  margin-bottom: 30px;
  padding: 11px 0px;
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
