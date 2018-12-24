import React from 'react';
import styled from 'styled-components';
import Chart from 'chart.js';

class ModalLineGraph extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount = () => {
    new Chart(this.myRef.current, {
      type: 'line',
      data: this.buildLineDataFromProps(),
      options: {
        legend: {
          labels: {
            defaultFontSize: 14
          }
        }
      }
    });
  };
  buildLineDataFromProps = () => {
    const { alternatives, LPRs } = this.props;
    const valuesKorogodin = LPRs.Korogodin;
    const valuesBongard = LPRs.Bongard;
    let data = {
      labels: alternatives,
      datasets: []
    };

    data.datasets.push({
      data: LPRs.lpr,
      label: 'Приоритеты',
      pointBackgroundColor: '#3f51b5',
      borderColor: '#3f51b5',
      backgroundColor: `rgba(159,168,218,0.2)`,
      pointRadius: 3
    });

    data.datasets.push({
      data: valuesKorogodin,
      label: 'Ценность информации по Корогодину',
      pointBackgroundColor: '#607d8b',
      borderColor: '#607d8b',
      backgroundColor: `rgba(176,190,197,0.2)`,
      pointRadius: 3
    });

    data.datasets.push({
      data: valuesBongard,
      label: 'Ценность информации по Бонгарду - Харкевичу',
      pointBackgroundColor: '#880e4f',
      borderColor: '#880e4f',
      backgroundColor: `rgba(248,187,208,0.2)`,
      pointRadius: 3
    });
    return data;
  };
  render() {
    const { alternatives, LPRs } = this.props;
    const valuesKorogodin = LPRs.Korogodin;
    const valuesBongard = LPRs.Bongard;
    const entropyBeginning = LPRs.entropyBeginning;
    const entropyFinal = LPRs.entropyFinal;
    const deltaEntropy = LPRs.deltaEntropy;
    return (
      <Container id="modalgraphcontainer" onClick={this.handleClick}>
        <LineContainer>
          <SubContainer>
            <Title>Оценка информации</Title>
            <SubTitle>Ценность информации</SubTitle>
            <Graph>
              <div>
                <canvas width="500" height="300" ref={this.myRef} />
              </div>
            </Graph>
            <Table>
              <Body>
                <Row>
                  <Cell>{}</Cell>
                  {alternatives.map((alt, id) => {
                    return <Cell key={id}>{alt}</Cell>;
                  })}
                </Row>
                <Row>
                  <Cell white>Приоритеты</Cell>
                  {alternatives.map((_alt, altId) => {
                    return (
                      <Cell key={altId} white>
                        {LPRs.lpr[altId]}
                      </Cell>
                    );
                  })}
                </Row>
                <Row>
                  <Cell white>Ценность информации по Корогодину</Cell>
                  {valuesKorogodin.map((val, id) => {
                    return (
                      <Cell key={id} white>
                        {val}
                      </Cell>
                    );
                  })}
                </Row>
                <Row>
                  <Cell white>Ценность информации по Бонгарду - Харкевичу</Cell>
                  {valuesBongard.map((val, id) => {
                    return (
                      <Cell key={id} white>
                        {val}
                      </Cell>
                    );
                  })}
                </Row>
              </Body>
            </Table>
            <SubTitle>Информационная энтропия по Шеннону</SubTitle>
            <Entropy>
              <Beginning>Начальная энтропия: {entropyBeginning}</Beginning>
              <Final>Конечная энтропия: {entropyFinal}</Final>
              <Delta>Убыль энтропии: {deltaEntropy}</Delta>
            </Entropy>
          </SubContainer>
        </LineContainer>
      </Container>
    );
  }
  handleClick = e => {
    if (e.target.id === 'modalgraphcontainer') {
      this.props.close();
    }
  };
}
const Title = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #111111;
`;
const SubTitle = styled.div`
  font-family: 'Roboto', sans-serif;
  margin-bottom: 10px;
  margin-top: 20px;
  font-size: 16px;
  font-weight: 700;
  color: #111111;
`;
const Entropy = styled.div``;
const Beginning = styled.div`
  margin-bottom: 7px;
`;
const Final = styled.div`
  margin-bottom: 7px;
`;
const Delta = styled.div``;
const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Graph = styled.div`
  & div {
    width: 500px;
    height: 300px;
  }
`;
const Table = styled.table`
  border-collapse: collapse;
  margin-bottom: 0;
`;
const Body = styled.tbody``;
const Row = styled.tr``;
const Cell = styled.td`
  padding: 5px;
  max-width: 200px;
  border: 1px solid #348ce8;
  text-align: center;
  color: #111111;
  background-color: ${props => (props.white ? 'transparent' : '#62a3ff')};
`;

const LineContainer = styled.div`
  width: 80%;
  height: 80%;
  overflow: auto;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  background-color: rgba(11, 37, 69, 0.85);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ModalLineGraph;
