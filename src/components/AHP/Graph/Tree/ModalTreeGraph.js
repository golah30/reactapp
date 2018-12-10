import React from 'react';
import styled from 'styled-components';
import Vega from '../../../Vega';
import { buildVegaSpec } from './Spec';
import { connect } from 'react-redux';

class ModalGraph extends React.Component {
  handleClick = e => {
    if (e.target.id === 'modalgraphcontainer') {
      this.props.close();
    }
  };
  render() {
    const { purpose, criterias, alternatives, LPRs } = this.props;
    return (
      <Container id="modalgraphcontainer" onClick={this.handleClick}>
        <TreeContainer>
          <Vega
            spec={buildVegaSpec(
              {},
              { target: purpose.target, criterias, alternatives, LPRs }
            )}
          />
        </TreeContainer>
      </Container>
    );
  }
}

const TreeContainer = styled.div`
  width: 80%;
  height: 80%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  background-color: rgba(0, 74, 159, 0.75);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const mapStateToProps = state => ({
  purpose: state.AHP.purpose,
  criterias: state.AHP.criterias,
  alternatives: state.AHP.alternatives,
  LPRs: state.AHP.LPRs.data
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalGraph);
