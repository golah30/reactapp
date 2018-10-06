import React, { Fragment } from 'react';
import styled from 'styled-components';
import { SubHeader } from '../../UI';
import HelpMenu from '../HelpMenu';

class MainPage extends React.PureComponent {
  render = () => (
    <Fragment>
      <SubHeader title={'Справка СППР NooTron'} />
      <Description>
        Справка системы поддержки принятия решений (СППР) NooTron содержит
        краткую информацию о системах поддержки принятия решений, о методах и
        задачах многокритериального анализа (МКА), в том числе – о методах,
        разработанных авторами. В ней приведены характеристики, алгоритмы и
        примеры решения задач с помощью методов, включенных в СППР NooTron.
        Представлена инструкция пользователю и приведен список литературы, для
        желающих более детально ознакомиться с методами многокритериального
        анализа.
      </Description>
      <MenuContainer>
        <HelpMenu />
      </MenuContainer>
    </Fragment>
  );
}

const Description = styled.p`
  padding: 0 100px;
  text-align: center;
`;
const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default MainPage;
