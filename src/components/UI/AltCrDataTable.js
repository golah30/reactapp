import React from 'react';
import styled from 'styled-components';

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
                <Cell white>{LPRs[0].lpr[CrId].lpr}</Cell>
                {alt.map((_alt, altId) => {
                  return (
                    <Cell key={CrId + altId} white>
                      {LPRs[CrId + 1].lpr[altId].lpr}
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
  border: 1px solid #348ce8;
  text-align: center;
  color: #111111;
  background-color: ${props => (props.white ? 'transparent' : '#62a3ff')};
`;
