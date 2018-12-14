import React, { PureComponent, Fragment } from 'react';
import _ from 'lodash';
import Cell from './Cell';
import { Table, Body, Row, TitleCell } from './styles';

export default class ManualTypeTable extends PureComponent {
  state = {
    cells: []
  };
  componentDidMount() {
    this.setStateFromProps();
  }
  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.values, prevProps.values)) {
      this.setStateFromProps();
    }
    if (!_.isEqual(this.props.mode, prevProps.mode)) {
      this.setStateFromProps();
    }
  }
  setStateFromProps = () => {
    const { values, comparedItems, mode } = this.props;
    if (
      values !== null &&
      values.length !== 0 &&
      values.length === comparedItems.length
    ) {
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
      if (mode === 'rand') {
        cells = this.setRndValues(cells);
      }
      if (mode === 'auto') {
        cells = this.setAutoValues(cells);
      }
      this.setState({ cells: cells }, () => {
        this.props.change(this.state.cells);
      });
    }
  };
  render() {
    const { comparedItems, localPriorities } = this.props;
    const { cells } = this.state;
    if (comparedItems)
      if (cells.length !== comparedItems.length) {
        return null;
      }
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
                      off={colId <= rowId}
                      change={this.handleChange}
                      validate={this.validate}
                      value={cells.length > 0 ? cells[rowId][colId].value : ''}
                    />
                  </Fragment>
                ))}
                <TitleCell white>
                  {localPriorities && localPriorities[rowId]
                    ? localPriorities[rowId]
                    : '-'}
                </TitleCell>
              </Row>
            ))}
          </Body>
        </Table>
      </Fragment>
    );
  }
  setAutoValues = cells => {
    const length = this.props.comparedItems.length;
    for (let i = 0; i < length; ++i) {
      let k = 1;
      for (let j = 0; j < length; ++j) {
        if (j > i) {
          k += 1;
          cells[i][j] = { value: `${k}`, valid: true };
        } else if (j < i) {
          cells[i][j] = this.revertData(cells[j][i]);
        }
      }
    }
    return cells;
  };
  setRndValues = cells => {
    const length = this.props.comparedItems.length;
    for (let i = 0; i < length; ++i) {
      for (let j = 0; j < length; ++j) {
        if (j > i) {
          let rand = 1 - 0.5 + Math.random() * (9 - 1 + 1);
          rand = Math.round(rand);
          cells[i][j] = { value: `${rand}`, valid: true };
        } else if (j < i) {
          cells[i][j] = this.revertData(cells[j][i]);
        }
      }
    }
    return cells;
  };
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
  validate = value => {
    const reg = /^([1-9])$|^1\/([1-9])$/;
    return reg.test(value);
  };
}
