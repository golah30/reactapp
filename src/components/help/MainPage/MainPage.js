import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { helpCategoriesRequest } from '../../../ducks/HELP';
import { SubHeader } from '../../UI';
import HelpMenu from '../HelpMenu';
import { CATEGORIES } from '../../../api';

class MainPage extends React.PureComponent {
  componentWillMount() {
    this.props.helpCategoriesRequest(CATEGORIES);
  }

  render = () => {
    const { error, isFetching, result, isAuthorized } = this.props;

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
          {isAuthorized && (
            <EditSection to="/help/admin">Редактировать</EditSection>
          )}
        </MenuContainer>
      </Fragment>
    );
  };

  errorRender = () => <p>При загрузке данных произошла ошибка</p>;
  loadingRender = () => <p>Данные загружаются...</p>;
}
const EditSection = styled(Link)`
  box-sizing: border-box;
  display: inline-block;
  max-width: 800px;
  min-width: 300px;
  user-select: none;
  margin: 0;
  padding: 0;
  text-align: center;
  border: 2px solid #1675d1;
  padding: 10px 15px;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  text-decoration: none;
  color: #fbfdff;
  background-color: #1675d1;
  cursor: pointer;
  transition: color 0.4s, background-color 0.3s;
  &:hover {
    color: #072643;
    background-color: transparent;
  }
`;
const Description = styled.p`
  padding: 0 100px;
  text-align: center;
`;
const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const mapStateToProps = state => ({
  isFetching: state.HELP.isCategoryFetching,
  result: state.HELP.categoriesResult,
  error: state.HELP.categoryError,
  isAuthorized: state.Auth.Auth
});
const mapDispatchToProps = { helpCategoriesRequest };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
