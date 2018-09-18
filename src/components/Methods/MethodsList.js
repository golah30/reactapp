import React, { PureComponent } from 'react';
import Method from './Method';
import styled from 'styled-components';
import mai from '../../assets/img/methods/mai.svg';
import maiabs from '../../assets/img/methods/maiabs.svg';

class MethodsList extends PureComponent {
  state = {
    methods: [
      {
        id: 1,
        title: 'Метод Анализа Иерархий (МАИ)',
        caption: `В 70-80-е годы американский учёный Т.Л. Саати разработал и развил 
      "иерархический аналитический процесс" (analytic hierarchy process, 
      AHP) – мощный метод сопоставительного анализа и ранжирования 
      объектов, характеризующихся наборами...`,
        img: mai,
        route: 'mai',
        helplink: '#'
      },
      {
        id: 2,
        title: 'МАИ в абсолютных измерениях',
        caption: `Метод анализа иерархий(МАИ) в абсолютный измерениях проявляется 
      в использовании экспертных суджений для создания шкалы 
      интенсивностей (лингвистических стандартов), которую можно
      применить...`,
        img: maiabs,
        route: 'maiabs',
        helplink: '#'
      }
    ]
  };
  render() {
    return (
      <List>
        {this.state.methods.length !== 0
          ? this.state.methods.map((method, key) => (
              <Method
                key={key}
                title={method.title}
                caption={method.caption}
                img={method.img}
                route={method.route}
                help={method.helplink}
              />
            ))
          : null}
      </List>
    );
  }
}

const List = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export default MethodsList;
