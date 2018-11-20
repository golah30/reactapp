import React, { Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { PriorityTable, Indicators, Button, RadioGroup } from '../../UI';

import {
  setAhpTarget,
  setAhpStage,
  ahpLprRequest,
  ahpLprSuccess
} from '../../../ducks/AHP';

class AHPCompare extends React.PureComponent {
  state = {
    table: [],
    isTableValid: false,
    radio: {}
  };
  componentDidMount() {
    const { LPRs, criterias } = this.props;

    let stage = {};
    if (this.props.match.params.id === '0') {
      if (LPRs.length !== criterias.length + 1) {
        let array = [{}];
        for (let i = 0; i < criterias.length; ++i) array.push({});
        this.props.ahpLprSuccess(array);
      }
      stage = {
        main: 2,
        isSub: false,
        sub: 0
      };
    } else if (this.props.match.params.id !== '0') {
      stage = {
        main: 3,
        isSub: true,
        sub: this.props.match.params.id - 1
      };
    }

    this.props.setAhpStage(stage);
  }
  render() {
    const pageId = parseInt(this.props.match.params.id, 10);
    const { criterias, alternatives, LPRs } = this.props;
    return (
      <Fragment>
        <Heading>
          {pageId === 0 ? (
            <Fragment>
              <PurposeLabel>
                Выберите способ сравнения критериев по цели:{' '}
              </PurposeLabel>
              <Purpose>{this.props.target}</Purpose>
            </Fragment>
          ) : (
            <Fragment>
              <PurposeLabel>
                Выберите способ сравнения альтернатив по критерию
              </PurposeLabel>
              <Purpose>"{this.props.criterias[pageId - 1]}"</Purpose>
            </Fragment>
          )}
        </Heading>
        <RadioGroup
          value={{ type: 'compare', insert: 'auto' }}
          change={this.handleRadioChange}
        />
        <PriorityTable
          values={
            LPRs[pageId] && LPRs[pageId].table ? LPRs[pageId].table : null
          }
          localPriorities={
            LPRs[pageId] && LPRs[pageId].lpr ? LPRs[pageId].lpr : null
          }
          comparedItems={pageId === 0 ? criterias : alternatives}
          change={this.handleTableChange}
        />
        <Indicators
          values={
            LPRs[pageId] && LPRs[pageId].indicators
              ? LPRs[pageId].indicators
              : null
          }
        />
        <Button
          title={'Вычислить'}
          disabled={!this.state.isTableValid}
          click={this.calcLPRs}
        />
      </Fragment>
    );
  }

  calcLPRs = () => {
    const data = this.state.table;
    this.props.ahpLprRequest({
      id: 0,
      table: data
    });
  };
  isValid = () => {
    const table = this.state.table;

    if (table.length === 0) return this.setState({ isTableValid: false });
    for (let row of table)
      for (let cell of row)
        if (!cell.valid) return this.setState({ isTableValid: false });

    return this.setState({ isTableValid: true });
  };
  handleTableChange = cells => {
    this.setState({ table: cells }, this.isValid);
  };
  handleRadioChange = radio => {
    this.setState({ radio: radio });
  };
}

const Heading = styled.div`
  margin-bottom: 40px;
`;
const PurposeLabel = styled.span`
  font-size: 18px;
  margin-right: 10px;
`;
const Purpose = styled.span`
  margin: 0;
  width: 538px;
  font-size: 18px;
`;
const mapStateToProps = state => ({
  stage: state.AHP.stage,
  target: state.AHP.purpose.target,
  LPRs: state.AHP.LPRs.data,
  criterias: state.AHP.criterias,
  alternatives: state.AHP.alternatives
});
const mapDispatchToProps = {
  setAhpStage,
  setAhpTarget,
  ahpLprRequest,
  ahpLprSuccess
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AHPCompare);
