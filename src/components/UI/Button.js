import React from 'react';
import styled from 'styled-components';
import Pallete from '../../colors';

export default class Button extends React.PureComponent {
  render() {
    return (
      <StyledButton onClick={this.props.click} disabled={this.props.disabled}>
        {this.props.title}
      </StyledButton>
    );
  }
}
const StyledButton = styled.button`
  box-sizing: border-box;
  min-width: 175px;
  margin-bottom: 30px;
  padding: 11px 5px;
  transition: background-color 0.5s;
  text-align: center;
  color: #fafafa;
  border: none;
  border-radius: 3px;
  background-color: ${Pallete.blue};
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  &:active {
    outline: none;
  }
  &:hover {
    outline: none;
    background-color: ${Pallete.darkBlue};
  }
  &:disabled {
    cursor: default;
    color: darkgrey;
    background-color: lightgrey;
  }
`;
