import React from 'react';
import styled from 'styled-components';

export default class CheckBox extends React.PureComponent {
  state = {
    isChecked: false
  };

  componentDidMount() {
    if (this.props.isChecked)
      this.setState({ isChecked: this.props.isChecked });
  }
  handleClick = () => {
    this.setState({ isChecked: !this.state.isChecked }, () => {
      if (this.props.change) this.props.change(this.state.isChecked);
    });
  };

  render() {
    return (
      <Label>
        <Input
          onChange={this.handleClick}
          type="checkbox"
          checked={this.state.isChecked}
        />
        <Icon />
      </Label>
    );
  }
}
/*simple usage - <CheckBox change={this.handleChange} isChecked /> */
const Label = styled.label`
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  border: 1px solid #62a3ff;
  width: 24px;
  height: 24px;
  transition: background-color 0.5s, border 0.5s;
  &:hover {
    background-color: rgba(98, 163, 255, 0.3);
    border-color: #004a9f;
  }
`;
const Input = styled.input`
  position: absolute;
  left: -9999px;
  &:checked + i {
    opacity: 1;
  }
`;
const Icon = styled.i`
  display: block;
  width: 17px;
  height: 13px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s;
  background: url('./check.svg');
  opacity: 0;
`;
