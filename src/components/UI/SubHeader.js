import React from 'react';
import styled from 'styled-components';

class SubHeader extends React.PureComponent {
  render() {
    return (
      <Container>
        <PageTitle>
          {this.props.title ? this.props.title : 'Решение задачи'}
        </PageTitle>
        {this.props.controll &&
          !this.props.disabled && (
            <Button onClick={this.props.click} disabled={this.props.disabled}>
              {this.props.controllTitle}
            </Button>
          )}
      </Container>
    );
  }
}

const Container = styled.div`
  padding: 0 100px;
  align-items: center;
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
const Button = styled.button`
  border-radius: 3px;
  border: none;
  color: #fafafa;
  font-size: 20px;
  background: #62a3ff;
  padding: 12px 20px;
  width: 250px;
  height: 50px;
  transition: background-color 0.5s;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    background: transparent;
  }
`;

export default SubHeader;
