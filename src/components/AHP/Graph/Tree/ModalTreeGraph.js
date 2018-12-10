import React from 'react';
import styled from 'styled-components';
import Vega from '../../../Vega';
import { buildVegaSpec } from './Spec';

class ModalGraph extends React.Component {
  handleClick = e => {
    if (e.target.id === 'modalgraphcontainer') {
      this.props.close();
    }
  };
  render() {
    return (
      <Container id="modalgraphcontainer" onClick={this.handleClick}>
        <TreeContainer>
          <Vega spec={buildVegaSpec()} />
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
export default ModalGraph;
