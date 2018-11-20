import React, { Fragment } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

class PriorityTable extends React.Component {
  state = {
    cells: []
  };
  componentDidMount() {
    const { values, comparedItems } = this.props;
    if (values !== null && values.length !== 0) {
      this.setState({ cells: values }, () => {
        this.props.change(values);
      });
    } else {
      let cells = [];
      for (let i = 0; i < comparedItems.length; i++) {
        let items = [];
        for (let j = 0; j < comparedItems.length; j++) {
          if (i === j) {
            items.push({ value: '1', valid: true });
          } else {
            items.push({ value: '', valid: false });
          }
        }
        cells.push(items);
      }
      this.setState({ cells: cells });
    }
  }

  render() {
    const { comparedItems, localPriorities } = this.props;

    return (
      <Fragment>
        <Table>
          <Body>
            <Row>
              <TitleCell>{}</TitleCell>
              <TitleCell>Название</TitleCell>
              {comparedItems.map((_item, colId) => (
                <Fragment key={colId}>
                  <TitleCell>{colId + 1}</TitleCell>
                </Fragment>
              ))}
              <TitleCell>ЛПр.</TitleCell>
            </Row>

            {comparedItems.map((item, rowId) => (
              <Row key={rowId}>
                <TitleCell>{rowId + 1}</TitleCell>
                <TitleCell white>{item}</TitleCell>
                {comparedItems.map((_item, colId) => (
                  <Fragment key={colId}>
                    <Cell
                      row={rowId}
                      col={colId}
                      change={this.handleChange}
                      value={
                        this.state.cells.length > 0
                          ? this.state.cells[rowId][colId].value
                          : ''
                      }
                    />
                  </Fragment>
                ))}
                <TitleCell white>
                  {localPriorities && localPriorities[rowId].lpr
                    ? localPriorities[rowId].lpr
                    : '-'}
                </TitleCell>
              </Row>
            ))}
          </Body>
        </Table>
      </Fragment>
    );
  }

  handleChange = (row, col, data) => {
    const { change } = this.props;
    let items = _.cloneDeep(this.state.cells);
    items[row][col] = data;

    if (data.valid) {
      items[col][row] = this.revertData(data);
    }

    change(items);
    this.setState({ cells: items });
  };
  revertData = data => {
    let value = '';

    if (data.value.length === 1) {
      value = data.value === '1' ? data.value : `1/${data.value}`;
    } else {
      value = data.value[2];
    }

    return { value: value, valid: true };
  };
}

class Cell extends React.PureComponent {
  handleChange = e => {
    const { change, row, col } = this.props;

    if (this.validate(e.target.value)) {
      if (change) change(row, col, { value: e.target.value, valid: true });
    } else {
      if (change) change(row, col, { value: e.target.value, valid: false });
    }
  };
  validate = value => {
    const reg = /^([1-9])$|^1\/([1-9])$/;
    return reg.test(value);
  };
  render() {
    const { row, col, value } = this.props;

    if (col === row) {
      return (
        <CellContainer gray>
          <CellInput type="text" value={'1'} readOnly={true} />
        </CellContainer>
      );
    } else if (col < row) {
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

const Table = styled.table`
  border-collapse: collapse;
  margin-bottom: 30px;
`;
const Body = styled.tbody``;
const Row = styled.tr``;
const TitleCell = styled.td`
  padding: 5px;
  border: 1px solid #348ce8;
  text-align: center;
  background-color: ${props => (props.white ? 'transparent' : '#62a3ff')};
`;

const CellContainer = styled.td`
  border: 1px solid #348ce8;
  text-align: center;
  background-color: ${props => (props.gray ? '#d3d3d3' : 'transparent')};
  & input {
    background-color: ${props => (props.gray ? '#d3d3d3' : 'transparent')};
  }
`;
const CellInput = styled.input`
  box-sizing: border-box;
  border: none;
  width: 50px;
  padding: 5px;
  color: #111111;
  text-align: center;
  &:focus {
    outline: none;
  }
`;

export default PriorityTable;
