import React from 'react';
import styled from 'styled-components';
import HelpMenuAccordion from './HelpMenuAccordion';

// const data = [
//   {
//     title: 'Системы поддержки принятия решений',
//     posts: [
//       {
//         id: 1,
//         title: 'Классификация СППР'
//       },
//       {
//         id: 2,
//         title: 'СППР NooTron'
//       }
//     ]
//   },
//   {
//     title: 'Многокритериальный анализ: методы и системные задачи',
//     posts: [
//       {
//         id: 3,
//         title: 'Классификация методов'
//       },
//       {
//         id: 4,
//         title: 'Основные задачи МКА'
//       }
//     ]
//   },
//   {
//     title: 'Методы в СППР NooTron',
//     posts: [
//       {
//         id: 5,
//         title: 'Метод анализа иерархий'
//       },
//       {
//         id: 6,
//         title: 'Метод взвешенных сумм'
//       },
//       {
//         id: 7,
//         title: 'Метод матрицы решений'
//       },
//       {
//         id: 8,
//         title: 'Метод анализа сетей'
//       },
//       {
//         id: 9,
//         title: 'Интегрированный метод МАИ+ММР'
//       }
//     ]
//   }
// ];

export class HelpMenu extends React.PureComponent {
  render() {
    return (
      <Menu>
        {this.props.data.length !== 0
          ? this.props.data.map((item, key) => (
              <HelpMenuAccordion key={key} category={item} />
            ))
          : 'Help materials are unavailable'}
      </Menu>
    );
  }
}

const Menu = styled.div`
  max-width: 800px;
  min-width: 300px;
  user-select: none;
`;

export default HelpMenu;
