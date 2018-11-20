import React from 'react';
import styled from 'styled-components';

class Indicators extends React.PureComponent {
  state = {
    default: ['-', '-', '-', '-']
  };
  render() {
    const values = this.props.values || this.state.default;
    return (
      <Container>
        <tbody>
          <tr>
            <Header>Dim</Header>
            <Header>Lam</Header>
            <Header>CI</Header>
            <Header>CR</Header>
          </tr>
          <tr>
            {values.map((item, key) => (
              <Cell key={key}>{item}</Cell>
            ))}
          </tr>
        </tbody>
      </Container>
    );
  }
}

const Container = styled.table`
  margin-bottom: 30px;
  text-align: center;
  border-collapse: collapse;
`;
const Header = styled.th`
  box-sizing: border-box;
  padding: 3px 11px;
  color: #fafafa;
  font-weight: normal;
  font-size: 18px;
  border: 1px solid #438fec;
  background-color: #62a3ff;
`;
const Cell = styled.td`
  box-sizing: border-box;
  padding: 3px 11px;
  border: 1px solid #438fec;
  font-size: 18px;
  text-align: center;
`;

export default Indicators;
