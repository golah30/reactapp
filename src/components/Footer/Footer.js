import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Pallete from '../../colors';

export class Footer extends React.PureComponent {
  render() {
    return (
      <StyledFooter>
        <FooterContainer>
          <FooterLower>
            <Socials>
              <Social>
                <DefaultLink vk href="#">
                  <i className="fa fa-vk" aria-hidden="true" />
                </DefaultLink>
              </Social>
              <Social>
                <DefaultLink google href="#">
                  <i className="fa fa-google-plus" aria-hidden="true" />
                </DefaultLink>
              </Social>
              <Social>
                <DefaultLink ln href="#">
                  <i className="fa fa-linkedin" aria-hidden="true" />
                </DefaultLink>
              </Social>
            </Socials>
            <Copy>
              <i className="fa fa-copyright" aria-hidden="true" />
              <span> 2011 - 2017</span> NooTron teams
            </Copy>
            <Links>
              <StyledLink to="/">О проекте</StyledLink>
              <StyledLink to="/">Кафедра ИТС</StyledLink>
              <StyledLink to="/">Приложение</StyledLink>
            </Links>
          </FooterLower>
        </FooterContainer>
      </StyledFooter>
    );
  }
}
const Links = styled.div`
  display: flex;
  margin: auto 0;
  justify-content: space-between;
  width: 400px;
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
const StyledFooter = styled.footer`
  width: 100%;
  background-color: ${Pallete.darkBlue};
`;
const FooterContainer = styled.div`
  min-height: 30px;
  padding: 0 20px;
`;
const FooterLower = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
`;
const Copy = styled.div`
  color: ${Pallete.white};
  font-size: 14px;
  font-style: italic;
  font-weight: 300;
`;
const Socials = styled.ul`
  display: flex;
  justify-content: flex-start;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 400px;
`;
const Social = styled.li`
  margin-right: 10px;
`;
const DefaultLink = styled.a`
  display: block;
  position: relative;
  background: transparent;
  color: #111111;
  font-size: 26px;
  height: 30px;
  width: 30px;
  transition: background-color 0.5s, color 0.5s;
  & i {
    position: absolute;
    color: ${Pallete.white};
    top: 50%;
    left: 50%;
    transition: color 0.5s;
    transform: translate(-50%, -50%);
  }
  &:hover i {
    color: ${props =>
      props.vk ? '#507299' : props.google ? '#DB4437' : '#0077B5'};
  }
`;
export default Footer;
