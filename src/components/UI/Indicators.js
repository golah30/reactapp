import React from 'react';
import styled from 'styled-components';
import Pallete from '../../colors';

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
  border-radius: 2px;
  overflow: hidden;
`;
const Header = styled.th`
  box-sizing: border-box;
  padding: 3px 11px;
  color: ${Pallete.white};
  font-weight: normal;
  font-size: 18px;
  border: 1px solid ${Pallete.blue};
  background-color: ${Pallete.lightBlue};
`;
const Cell = styled.td`
  box-sizing: border-box;
  padding: 3px 11px;
  border: 1px solid ${Pallete.blue};
  font-size: 18px;
  text-align: center;
`;

export default Indicators;
