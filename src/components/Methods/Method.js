import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class Method extends PureComponent {
  render() {
    const { title, caption, img, route, help, alt } = this.props;

    return alt ? (
      <div>alt</div>
    ) : (
      <Item>
        <Container>
          {img && <Img src={img}>{}</Img>}
          <ContainerText>
            <Title>
              <TitleLink to={route ? route : ''}>{title}</TitleLink>
            </Title>
            <Caption>
              {caption}
              <ItemLink to={help ? help : ''}>Читать далее</ItemLink>
            </Caption>
          </ContainerText>
        </Container>
      </Item>
    );
  }
}

const Item = styled.li`
  padding: 24.5px 0;
  border-bottom: 1px solid #95989a;
  transition: background-color 0.5s;
  &:hover {
    background: rgba(99, 163, 255, 0.15);
  }
`;
const Caption = styled.p`
  margin: 0;
  padding: 0;
  font-size: 18px;
`;
const ItemLink = styled(Link)`
  color: #62a3ff;
  font-size: 16px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
const Img = styled.img`
  width: 150px;
  height: 150px;
`;
const Title = styled.h1`
  margin: 0;
  margin-bottom: 8px;
  font-size: 28px;
  font-family: 'Playfair Display', sans-serif;
`;
const TitleLink = styled(Link)`
  text-decoration: none;
  color: #004a9f;
  transition: color 0.5s;
  cursor: pointer;
  &:hover {
    color: #ba2635;
  }
`;
const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`;
const ContainerText = styled.div`
  margin-left: 25px;
  width: 582px;
`;

export default Method;
