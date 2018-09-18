import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Method from './Method';

class AltMethodsList extends PureComponent {
  state = {
    maiAndMvs: [
      { title: 'Дескриптивный МАС', route: '' },
      { title: 'Нормативный МАИ', route: '' },
      { title: 'Максиминный МАИ', route: '' },
      { title: 'Методология BOCR', route: '' }
    ],
    ai: [{ title: 'Методы распознавания образов', route: '' }],
    mmr: [
      { title: 'Классический ММР', route: '' },
      { title: 'Интегрированый метод МАИ + ММР', route: '' }
    ],
    mvs: [
      { title: 'Классический МВС', route: '' },
      { title: 'Интегрированный метод МВС + МАИ', route: '' },
      { title: 'Метод ранжированных весов критериев', route: '' },
      { title: 'Метод нелинейных взвешеных сверток', route: '' }
    ]
  };
  render() {
    const { maiAndMvs, ai, mmr, mvs } = this.state;
    return (
      <AltMethods>
        <Left>
          <MaiMvs>
            <Title>Варианты МАИ/МАС</Title>
            <List>
              {maiAndMvs !== 0
                ? maiAndMvs.map((method, key) => (
                    <StyledMethod
                      key={key}
                      title={method.title}
                      route={method.route}
                      alt={true}
                    />
                  ))
                : null}
            </List>
          </MaiMvs>
          <Mmr>
            <Title>Варианты ММР</Title>
            <List>
              {mmr !== 0
                ? mmr.map((method, key) => (
                    <StyledMethod
                      key={key}
                      title={method.title}
                      route={method.route}
                      alt={true}
                    />
                  ))
                : null}
            </List>
          </Mmr>
        </Left>
        <Right>
          <Ai>
            <Title>Методы на искусственных нейронных сетях</Title>
            <List>
              {ai !== 0
                ? ai.map((method, key) => (
                    <StyledMethod
                      key={key}
                      title={method.title}
                      route={method.route}
                      alt={true}
                    />
                  ))
                : null}
            </List>
          </Ai>
          <Mvs>
            <Title>Варианты МВС</Title>
            <List>
              {mvs !== 0
                ? mvs.map((method, key) => (
                    <StyledMethod
                      key={key}
                      title={method.title}
                      route={method.route}
                      alt={true}
                    />
                  ))
                : null}
            </List>
          </Mvs>
        </Right>
      </AltMethods>
    );
  }
}

const AltMethods = styled.div`
  padding: 50px 0 240px 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: flex-start;
`;

const Left = styled.div`
  padding-right: 100px;
  border-right: 2px solid #62a3ff;
`;
const Right = styled.div`
  margin-left: 50px;
`;

const MaiMvs = styled.div`
  margin-bottom: 40px;
`;
const Mmr = styled.div``;
const Ai = styled.div`
  margin-bottom: 40px;
`;
const Mvs = styled.div``;
const Title = styled.h2`
  margin: 0;
  padding: 0;
  margin-bottom: 25px;
  color: #004a9f;
  font-size: 28px;
  font-family: 'Playfair Display', sans-serif;
`;
const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;
const StyledMethod = styled(Method)`
  font-size: 24px;
  margin-bottom: 16px;
  transition: color 0.5s;
  &:hover {
    color: #ba2635;
  }
`;
export default AltMethodsList;
