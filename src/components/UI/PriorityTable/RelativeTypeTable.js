import React, { PureComponent, Fragment } from 'react';
import _ from 'lodash';
import Cell from './Cell';
import { Table, Body, Row, TitleCell } from './styles';

export default class RelativeTypeTable extends PureComponent {
  state = {
    cells: []
  };
  componentDidMount() {
    this.setStateFromProps();
  }
  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.mode, prevProps.mode)) {
      this.setStateFromProps();
    }
    if (!_.isEqual(this.props.values, prevProps.values)) {
      this.setStateFromProps();
    }
  }
  setStateFromProps = () => {
    const { values, comparedItems } = this.props;
    if (
      values !== null &&
      values.length !== 0 &&
      values.length - 1 === comparedItems.length
    ) {
      this.setState({ cells: values }, () => {
        this.setRelativeValues();
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
      let items = [];
      for (let j = 0; j < comparedItems.length; j++) {
        items.push({ value: '', valid: false });
      }
      cells.push(items);

      this.setState({ cells: cells }, () => {
        this.props.change(this.state.cells);
      });
    }
  };
  render() {
    const { comparedItems, localPriorities } = this.props;
    const { cells } = this.state;

    if (comparedItems)
      if (cells.length !== comparedItems.length + 1) {
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
                      off={true}
                      change={this.handleChange}
                      validate={this.validateRelative}
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
            <Row>
              <TitleCell>{}</TitleCell>
              <TitleCell white>Шк. отн.</TitleCell>
              {comparedItems.map((_item, colId) => (
                <Fragment key={colId}>
                  <Cell
                    row={cells.length - 1}
                    col={colId}
                    off={false}
                    change={this.handleRelativeChange}
                    validate={this.validateRelative}
                    value={
                      cells.length > 0
                        ? cells[cells.length - 1][colId].value
                        : ''
                    }
                  />
                </Fragment>
              ))}
              <TitleCell white>{}</TitleCell>
            </Row>
          </Body>
        </Table>
      </Fragment>
    );
  }
  handleRelativeChange = (row, col, data) => {
    let items = _.cloneDeep(this.state.cells);
    items[row][col] = data;

    this.setState({ cells: items }, () => {
      this.setRelativeValues();
    });
  };
  setRelativeValues = () => {
    const { change, mode } = this.props;

    let items = _.cloneDeep(this.state.cells);
    const lastRowIndex = items.length - 1;
    let valid = true;
    for (let i = 0; i < items[lastRowIndex].length; ++i) {
      if (!items[lastRowIndex][i].valid) {
        valid = false;
      }
    }

    if (valid) {
      for (let i = 0; i < items.length - 1; ++i) {
        for (let j = 0; j < items[i].length; ++j) {
          if (i !== j) {
            if (mode === 'max') {
              items[i][j] = {
                value: `${items[lastRowIndex][i].value}/${
                  items[lastRowIndex][j].value
                }`,
                valid: true
              };
            } else {
              items[i][j] = {
                value: `${items[lastRowIndex][j].value}/${
                  items[lastRowIndex][i].value
                }`,
                valid: true
              };
            }
          }
        }
      }
    }

    change(items);
    this.setState({ cells: items });
  };
  validateRelative = value => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };
}
