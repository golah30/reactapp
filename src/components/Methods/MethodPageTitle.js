import React, { PureComponent } from 'react';
import styled from 'styled-components';

class MethodPageTitle extends PureComponent {
  state = {
    altView: false
  };

  componentDidMount() {
    this.props.viewTogle(this.state.altView);
  }

  handleClick = () => {
    this.props.viewTogle(!this.state.altView);
    this.setState({ altView: !this.state.altView });
  };

  render() {
    return (
      <Container>
        <Title>Выберите метод решения задачи</Title>
        <Button onClick={this.handleClick}>
          {this.state.altView ? 'Стандартный вид' : 'Расширенный вид'}
        </Button>
      </Container>
    );
  }
}

const Container = styled.div`
  padding: 0 100px;
  height: 200px;
  background-color: #1675d1;
  justify-content: space-between;
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
`;
const Title = styled.h1`
  margin: 0;
  padding: 0;
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

export default MethodPageTitle;
