import React from 'react';
import styled from 'styled-components';
import Pallete from '../../colors';

class GPRTable extends React.PureComponent {
  state = {
    romeNum: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10']
  };
  render() {
    const { output, outputRel, alt, active } = this.props;
    return (
      <Table>
        <Body>
          <Row>
            <Cell>№</Cell>
            <Cell>Альтернативы</Cell>
            <Cell>Гл. Пр. Норм. на сумму</Cell>
            <Cell>Гл. Пр. Норм. на max</Cell>
          </Row>
          {alt.map((alt, altId) => {
            if (typeof active.category !== 'undefined') {
              if (active.category === `A${altId + 1}`) {
                return (
                  <Row active key={altId}>
                    <Cell white>{this.state.romeNum[altId]}</Cell>
                    <Cell white>{alt}</Cell>
                    <Cell white>{output[altId]}</Cell>
                    <Cell white>{outputRel[altId]}</Cell>
                  </Row>
                );
              } else {
                return (
                  <Row key={altId}>
                    <Cell white>{this.state.romeNum[altId]}</Cell>
                    <Cell white>{alt}</Cell>
                    <Cell white>{output[altId]}</Cell>
                    <Cell white>{outputRel[altId]}</Cell>
                  </Row>
                );
              }
            } else {
              return (
                <Row key={altId}>
                  <Cell white>{this.state.romeNum[altId]}</Cell>
                  <Cell white>{alt}</Cell>
                  <Cell white>{output[altId]}</Cell>
                  <Cell white>{outputRel[altId]}</Cell>
                </Row>
              );
            }
          })}
        </Body>
      </Table>
    );
  }
}

const Table = styled.table`
  border-collapse: collapse;
  margin-bottom: 30px;
`;
const Body = styled.tbody``;
const Row = styled.tr`
  background-color: ${props =>
    props.active ? Pallete.hoverRed : 'transparent'};
`;
const Cell = styled.td`
  padding: 5px;
  border: 1px solid ${Pallete.blue};
  text-align: center;
  color: ${props => (props.white ? '#111111' : Pallete.white)};
  background-color: ${props =>
    props.white ? 'transparent' : Pallete.lightBlue};
`;

export default GPRTable;
