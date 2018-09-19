import React from 'react';
import styled from 'styled-components';

class SubHeader extends React.PureComponent {
  render() {
    return (
      <Container>
        <PageTitle>
          {this.props.title ? this.props.title : 'Решение задачи'}
        </PageTitle>
      </Container>
    );
  }
}

const Container = styled.div`
  padding: 0 100px;
  background-color: #1675d1;
  justify-content: space-between;
  display: flex;
  flex-flow: row nowrap;
`;
const PageTitle = styled.h2`
  margin: 0;
  padding: 75px 0;
  color: #fafafa;
  font-size: 38px;
  font-family: 'Playfair Display', sans-serif;
  font-weight: 400;
`;

export default SubHeader;
