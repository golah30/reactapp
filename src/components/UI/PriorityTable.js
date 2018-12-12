import React, { Fragment } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

class PriorityTable extends React.Component {
  state = {
    cells: [],
    radio: {},
    selected: 0
  };
  componentDidMount() {
    this.setStateFromProps();
  }
  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.radio, prevProps.radio)) {
      this.setState({ radio: this.props.radio }, this.setStateFromProps());
    }
    if (!_.isEqual(this.props.values, prevProps.values)) {
      this.setStateFromProps();
    }
  }
  setStateFromProps = () => {
    const { values, comparedItems, radio } = this.props;
    if (
      values !== null &&
      values.length !== 0 &&
      ((values.length === comparedItems.length && radio.type !== 'relative') ||
        (values.length - 1 === comparedItems.length &&
          radio.type === 'relative'))
    ) {
      this.setState({ cells: values }, () => {
        if (radio.type === 'relative') {
          this.setRelativeValues();
        } else {
          this.props.change(values);
        }
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
      if (radio.type === 'insert' && radio.insert === 'auto') {
        cells = this.setRndValues(cells);
      }
      if (radio.type === 'relative') {
        let items = [];
        for (let j = 0; j < comparedItems.length; j++) {
          items.push({ value: '', valid: false });
        }
        cells.push(items);
      }
      this.setState({ cells: cells }, () => {
        this.props.change(this.state.cells);
      });
    }
  };
  render() {
    const { comparedItems } = this.props;
    const { radio, cells } = this.state;

    if (comparedItems)
      if (radio.type === 'relative') {
        if (cells.length !== comparedItems.length + 1) {
          return null;
        }
      } else if (cells.length !== comparedItems.length) {
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
            {this.renderCellsByRadioConrols()}
          </Body>
        </Table>
      </Fragment>
    );
  }
  renderCellsByRadioConrols = () => {
    const { radio, cells } = this.state;
    if (_.isEqual(radio, {})) {
      return null;
    }

    const { comparedItems, localPriorities } = this.props;

    if (radio.type === 'insert') {
      return (
        <Fragment>
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
        </Fragment>
      );
    }

    if (radio.type === 'compare') {
      return (
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
        </Fragment>
      );
    }

    if (radio.type === 'relative') {
      return (
        <Fragment>
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
                    cells.length > 0 ? cells[cells.length - 1][colId].value : ''
                  }
                />
              </Fragment>
            ))}
            <TitleCell white>{}</TitleCell>
          </Row>
        </Fragment>
      );
    }
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

  handleRelativeChange = (row, col, data) => {
    const { change } = this.props;
    let items = _.cloneDeep(this.state.cells);
    items[row][col] = data;

    change(items);
    this.setState({ cells: items }, () => {
      this.setRelativeValues();
    });
  };
  setRelativeValues = () => {
    const { radio } = this.state;
    const { change } = this.props;

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
            if (radio.relative === 'max') {
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
  validateRelative = value => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };
}

class Cell extends React.PureComponent {
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
  width: 60px;
  padding: 5px;
  color: #111111;
  text-align: center;
  &:focus {
    outline: none;
  }
`;

export default PriorityTable;
