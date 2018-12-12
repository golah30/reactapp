import React from 'react';
import { CellInput, CellContainer } from './styles';

export default class Cell extends React.PureComponent {
  handleChange = e => {
    const { change, row, col, validate } = this.props;

    if (validate(e.target.value)) {
      if (change) change(row, col, { value: e.target.value, valid: true });
    } else {
      if (change) change(row, col, { value: e.target.value, valid: false });
    }
  };

  render() {
    const { value, off } = this.props;

    if (off) {
      return (
        <CellContainer gray>
          <CellInput type="text" value={value ? value : ''} readOnly={true} />
        </CellContainer>
      );
    } else {
      return (
        <CellContainer>
          <CellInput
            type="text"
            value={value ? value : ''}
            onChange={this.handleChange}
          />
        </CellContainer>
      );
    }
  }
}
