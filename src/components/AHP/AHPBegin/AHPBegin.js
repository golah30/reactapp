import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Button, TextInput } from '../../UI';
import { setAhpTarget } from '../../../ducks/AHP';

class AHPBegin extends React.PureComponent {
  state = {
    target: ''
  };
  componentDidMount() {
    this.setState({ target: this.props.target });
  }

  handleChange = (name, data) => {
    this.setState({ [name]: data });
  };
  handleSubmit = () => {
    this.props.setAhpTarget(this.state.target);
    this.props.history.push('/ahp/input');
  };
  render() {
    return (
      <Container>
        <Description>
          <DescriptionP>Этот метод - для задач выбора.</DescriptionP>
          <DescriptionP>Работает с трехуровневой иерархией.</DescriptionP>
          <DescriptionP>
            Входные данные: цель; объекты, среди которых необходимо сделать
            выбор (до 10), критерии сравнения (до 10).
          </DescriptionP>
        </Description>
        <TextInput
          title={'Введите имя проекта'}
          limit={50}
          name={'target'}
          value={this.state.target}
          change={this.handleChange}
        />
        <ButtonContainer>
          <Button
            title="Продолжить"
            disabled={this.state.target.length === 0}
            click={this.handleSubmit}
          />
        </ButtonContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 50px 10px;
`;
const Description = styled.div`
  display: inline-block;
  margin: 0;
  margin-bottom: 50px;
`;
const DescriptionP = styled.p`
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  text-align: center;
`;
const ButtonContainer = styled.div`
  margin-top: 50px;
  display: flex;
  max-width: 475px;
  justify-content: space-between;
`;

const mapStateToProps = state => ({
  target: state.AHP.target
});
const mapDispatchToProps = { setAhpTarget };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AHPBegin);
