import React from 'react';
import styled from 'styled-components';
import Pallete from '../../colors';

export default class AltCrDataTable extends React.PureComponent {
  render() {
    const { alt, cr, LPRs } = this.props;
    return (
      <Table>
        <Body>
          <Row>
            <Cell>{}</Cell>
            <Cell>Пр.Кр.</Cell>
            {alt.map((alt, key) => (
              <Cell key={key}>{alt}</Cell>
            ))}
          </Row>
          {cr.map((cr, CrId) => {
            return (
              <Row key={CrId}>
                <Cell white>{cr}</Cell>
                <Cell white>{LPRs[0].lpr[CrId]}</Cell>
                {alt.map((_alt, altId) => {
                  return (
                    <Cell key={CrId + altId} white>
                      {LPRs[CrId + 1].lpr[altId]}
                    </Cell>
                  );
                })}
              </Row>
            );
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
const Row = styled.tr``;
const Cell = styled.td`
  padding: 5px;
  border: 1px solid ${Pallete.blue};
  text-align: center;
  color: ${props => (props.white ? '#111111' : Pallete.white)};
  background-color: ${props =>
    props.white ? 'transparent' : Pallete.lightBlue};
`;
