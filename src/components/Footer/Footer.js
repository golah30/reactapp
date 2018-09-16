import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export class Footer extends React.PureComponent {
  render() {
    return (
      <StyledFooter>
        <FooterContainer>
          <FooterUpper>
            <Category>
              <CategoryTitle>
                <StyledLink title to="">
                  О проекте
                </StyledLink>
              </CategoryTitle>
              <LinkList>
                <LinkListElement>
                  <StyledLink to="">История проекта</StyledLink>
                </LinkListElement>
                <LinkListElement>
                  <StyledLink to="">Кафедра ИТС</StyledLink>
                </LinkListElement>
                <LinkListElement>
                  <StyledLink to="">Exigen Agile Practices</StyledLink>
                </LinkListElement>
              </LinkList>
            </Category>
            <Category>
              <CategoryTitle>
                <StyledLink title to="">
                  Помощь
                </StyledLink>
              </CategoryTitle>
              <LinkList>
                <LinkListElement>
                  <StyledLink to="">С чего начать?</StyledLink>
                </LinkListElement>
                <LinkListElement>
                  <StyledLink to="">Библиотека методов</StyledLink>
                </LinkListElement>
              </LinkList>
            </Category>
            <Category>
              <CategoryTitle>
                <StyledLink title to="">
                  Исследования
                </StyledLink>
              </CategoryTitle>
              <LinkList>
                <LinkListElement>
                  <StyledLink to="">Прикладные задачи</StyledLink>
                </LinkListElement>
                <LinkListElement>
                  <StyledLink to="">Публикации</StyledLink>
                </LinkListElement>
                <LinkListElement>
                  <StyledLink to="">Работы студентов</StyledLink>
                </LinkListElement>
                <LinkListElement>
                  <StyledLink to="">Блог</StyledLink>
                </LinkListElement>
              </LinkList>
            </Category>
            <Category>
              <CategoryTitle>
                <StyledLink title to="">
                  Приложение
                </StyledLink>
              </CategoryTitle>
            </Category>
          </FooterUpper>
          <FooterLower>
            <Socials>
              <Social>
                <DefaultLink vk href="#">
                  <i class="fa fa-vk" aria-hidden="true" />
                </DefaultLink>
              </Social>
              <Social>
                <DefaultLink google href="#">
                  <i class="fa fa-google-plus" aria-hidden="true" />
                </DefaultLink>
              </Social>
              <Social>
                <DefaultLink ln href="#">
                  <i class="fa fa-linkedin" aria-hidden="true" />
                </DefaultLink>
              </Social>
            </Socials>
            <Copy>
              <i class="fa fa-copyright" aria-hidden="true" />
              <span>2011 - 2017</span> NooTron teams
            </Copy>
          </FooterLower>
        </FooterContainer>
      </StyledFooter>
    );
  }
}

const StyledFooter = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #004a9f;
`;
const FooterContainer = styled.div`
  min-height: 190px;
  padding: 0 100px;
`;
const FooterUpper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
`;
const LinkList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;
const LinkListElement = styled.li`
  margin-bottom: 5px;
`;
const StyledLink = styled(Link)`
  display: block;
  color: #fafafa;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-size: ${props => (props.title ? '18px' : '14px')};
  font-weight: 400;
  transition: color 0.5s;
  &:hover {
    color: #ff8e8c;
  }
`;
const Category = styled.div``;
const CategoryTitle = styled.h4`
  margin: 0;
  padding: 0;
  margin-bottom: 20px;
`;
const FooterLower = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  padding-bottom: 10px;
`;
const Copy = styled.div`
  color: rgba(250, 250, 250, 0.8);
  font-size: 16px;
  font-style: italic;
  font-weight: 300;
`;
const Socials = styled.ul`
  display: flex;
  justify-content: flex-start;
  list-style: none;
  margin: 0;
  padding: 0;
`;
const Social = styled.li`
  margin-right: 10px;
`;
const DefaultLink = styled.a`
  display: block;
  position: relative;
  background: #fafafa;
  color: #111111;
  font-size: 26px;
  height: 40px;
  width: 40px;
  transition: background-color 0.5s, color 0.5s;
  & i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &:hover {
    color: #fafafa;
    background-color: ${props =>
      props.vk ? '#507299' : props.google ? '#DB4437' : '#0077B5'};
  }
`;
export default Footer;
