import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { helpRequest } from '../../../ducks/HELP';
import { SubHeader } from '../../UI';
import HelpMenu from '../HelpMenu';

class MainPage extends React.PureComponent {
  componentWillMount() {
    this.props.helpRequest('http://localhost:3000/api/categories');
  }

  render = () => {
    const { error, isFetching, result } = this.props;

    if (error) return this.errorRender();
    if (isFetching) return this.loadingRender();

    return (
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
          {result.data &&
            result.data.categories && (
              <HelpMenu data={result.data.categories} />
            )}
        </MenuContainer>
      </Fragment>
    );
  };

  errorRender = () => <p>При загрузке данных произошла ошибка</p>;
  loadingRender = () => <p>Данные загружаются...</p>;
}

const Description = styled.p`
  padding: 0 100px;
  text-align: center;
`;
const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const mapStateToProps = state => ({
  isFetching: state.HELP.isFetching,
  result: state.HELP.result,
  error: state.HELP.error
});
const mapDispatchToProps = { helpRequest };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
