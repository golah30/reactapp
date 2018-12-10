import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { AltCrDataTable, GPRTable } from '../../UI';
import styled from 'styled-components';
import { getAHPResult } from '../../../api';

class AHPResult extends React.PureComponent {
  state = {
    loaded: false,
    result: {}
  };
  componentDidMount = async () => {
    const { alternatives, criterias, LPRs } = this.props;
    const result = await getAHPResult({ alternatives, criterias, LPRs });
    console.log(result);

    this.setState({ loaded: true, result: result });
  };

  render() {
    const { target, purpose, alternatives, criterias, LPRs } = this.props;
    return (
      <Fragment>
        <TextContainer>
          <TextTitle>Проект:</TextTitle>
          <Text>{target}</Text>
        </TextContainer>

        <TextContainer>
          <TextTitle>Цель:</TextTitle>
          <Text>{purpose.target}</Text>
        </TextContainer>

        <TableContainer>
          <TableLabel>Локальные приоритеты критериев и альтернатив</TableLabel>
          <AltCrDataTable alt={alternatives} cr={criterias} LPRs={LPRs} />
        </TableContainer>

        <TableContainer>
          <TableLabel>Локальные приоритеты критериев и альтернатив</TableLabel>
          <GPRTable alt={alternatives} GPR={criterias} />
        </TableContainer>
      </Fragment>
    );
  }
}

const TextContainer = styled.div`
  margin-bottom: 30px;
`;
const TextTitle = styled.span`
  margin-right: 8px;
`;
const Text = styled.span``;
const TableLabel = styled.div`
  margin-bottom: 10px;
`;
const TableContainer = styled.div`
  margin-bottom: 30px;
`;

const mapStateToProps = state => ({
  target: state.AHP.target,
  purpose: state.AHP.purpose,
  LPRs: state.AHP.LPRs.data,
  criterias: state.AHP.criterias,
  alternatives: state.AHP.alternatives
});
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AHPResult);
