import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Pallete from '../../colors';
import Aside from '../AHP/Aside';
import logo from '../../assets/img/logo.svg';

export class Header extends React.PureComponent {
  render() {
    const { hasAside, handleAsideMode, asideSubTitle } = this.props;
    return (
      <StyledHeader>
        {hasAside ? (
          <Aside subTitle={asideSubTitle} handleAsideMode={handleAsideMode}>
            {this.props.children}
          </Aside>
        ) : null}
        <HeaderContainer>
          {hasAside ? (
            <div />
          ) : (
            <LogoContainer>
              <LogoImg src={logo} alt="Nootron" />
              <Title>Nootron</Title>
            </LogoContainer>
          )}
          <Navigation>
            <StyledLink to="/help">Справка</StyledLink>
            <StyledLink to="/methods">Решить задачу</StyledLink>
            <StyledLink to="/auth">Авторизация</StyledLink>
          </Navigation>
        </HeaderContainer>
      </StyledHeader>
    );
  }
}
const LogoContainer = styled.div`
  display: flex;
`;
const LogoImg = styled.img`
  width: 101.5px;
  height: 78px;
  margin-right: 27.5px;
`;
const Title = styled.h2`
  margin: 0;
  padding-top: 15px;
  vertical-align: middle;
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  font-size: 36px;
  color: #fafafa;
`;
const StyledHeader = styled.header`
  position: relative;
  background-color: ${Pallete.darkBlue};
`;
const HeaderContainer = styled.div`
  min-height: 30px;
  padding: 0 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;
const Navigation = styled.nav`
  display: flex;
  margin: auto 0;
  justify-content: space-between;
  min-width: 400px;
`;
const StyledLink = styled(Link)`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: ${Pallete.white};
  text-decoration: none;
  transition: color 0.5s;
  text-transform: uppercase;
  &:hover {
    color: ${Pallete.hoverRed};
  }
`;

export default Header;
