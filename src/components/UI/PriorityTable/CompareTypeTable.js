import React, { PureComponent, Fragment } from 'react';
import _ from 'lodash';
import Cell from './Cell';
import { Table, Body, Row, TitleCell } from './styles';

export default class CompareTypeTable extends PureComponent {
  state = {
    cells: [],
    selected: 0
  };
  componentDidMount = () => {
    this.setStateFromProps();
  };
  componentDidUpdate = prevProps => {
    if (!_.isEqual(this.props.values, prevProps.values)) {
      this.setStateFromProps();
    }
  };
  setStateFromProps = () => {
    const { values, comparedItems } = this.props;
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
              <TitleCell>Приоритеты</TitleCell>
            </Row>
            <Fragment>
              {comparedItems.map((item, rowId) => (
                <Row key={rowId}>
                  <TitleCell>{rowId + 1}</TitleCell>
                  <TitleCell
                    white
                    id={rowId}
                    onClick={e => {
                      if (e.target.hasAttribute('id')) {
                        this.setState({
                          selected: parseInt(e.target.getAttribute('id'), 10)
                        });
                      }
                    }}
                  >
                    {item}
                  </TitleCell>
                  {comparedItems.map((_item, colId) => (
                    <Fragment key={colId}>
                      <Cell
                        row={rowId}
                        col={colId}
                        off={this.state.selected !== rowId || rowId === colId}
                        change={this.handleCompareChange}
                        validate={this.validate}
                        value={
                          cells.length > 0 ? cells[rowId][colId].value : ''
                        }
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
            </Fragment>
          </Body>
        </Table>
      </Fragment>
    );
  }
  handleCompareChange = (row, col, data) => {
    const { change } = this.props;
    let items = _.cloneDeep(this.state.cells);
    items[row][col] = data;

    let valid = true;
    for (let i = 0; i < items.length; ++i) {
      if (
        items[this.state.selected][i] === '' ||
        !items[this.state.selected][i].valid
      ) {
        valid = false;
      }
    }

    if (valid) {
      const j = this.state.selected;
      const reg1 = /^([1-9])$/;
      const reg2 = /^1\/([1-9])$/;

      for (let i = 0; i < items.length; ++i) {
        if (i !== j) {
          for (let k = 0; k < items.length; ++k) {
            let num = items[j][k].value;
            let denom = items[j][i].value;

            if (reg1.test(num) && reg1.test(denom)) {
              items[i][k] = { value: `${num}/${denom}`, valid: true };
            } else if (reg1.test(num) && reg2.test(denom)) {
              items[i][k] = {
                value: parseInt(denom.substring(2), 10) * parseInt(num, 10),
                valid: true
              };
            } else if (reg2.test(num) && reg1.test(denom)) {
              items[i][k] = {
                value: `1/${parseInt(num.substring(2), 10) *
                  parseInt(denom, 10)}`,
                valid: true
              };
            } else if (reg2.test(num) && reg2.test(denom)) {
              items[i][k] = {
                value: `${denom.substring(2)}/${num.substring(2)}`,
                valid: true
              };
            }
          }
        }
        items[i][i] = { value: '1', valid: true };
      }
    }

    change(items);
    this.setState({ cells: items });
  };
  validate = value => {
    const reg = /^([1-9])$|^1\/([1-9])$/;
    return reg.test(value);
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
