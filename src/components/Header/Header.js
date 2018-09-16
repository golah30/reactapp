import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/img/logo.svg';

export class Header extends React.PureComponent {
  render() {
    return (
      <StyledHeader>
        <HeaderContainer>
          <LogoContainer>
            <LogoImg src={logo} alt="Nootron" />
            <Title>Nootron</Title>
          </LogoContainer>
          <Navigation>
            <StyledLink to="/methods">Решить задачу</StyledLink>
            <StyledLink to="/help">Справка</StyledLink>
            <StyledLink to="/auth">Авторизация</StyledLink>
          </Navigation>
        </HeaderContainer>
      </StyledHeader>
    );
  }
}

const StyledHeader = styled.header`
  background-color: #004a9f;
`;
const HeaderContainer = styled.div`
  min-height: 80px;
  padding: 0 100px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;
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
const Navigation = styled.nav`
  display: flex;
  margin: auto 0;
  justify-content: space-between;
  min-width: 391px;
`;
const StyledLink = styled(Link)`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #fafafa;
  text-decoration: none;
  transition: color 0.5s;
  text-transform: uppercase;
  &:hover {
    color: #ff8e8c;
  }
`;

export default Header;
