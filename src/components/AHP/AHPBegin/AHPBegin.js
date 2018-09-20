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
  componentDidUpdate(prevProps) {
    if (this.props.target !== prevProps.target) {
      this.setState({ target: this.props.target });
    }
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
          Этот метод - для задач выбора. Работает с трехуровневой иерархией.
          Входные данные: цель; объекты, среди которых необходимо сделать выбор
          (до 10), критерии сравнения (до 10).
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
            title="Далее"
            disabled={this.state.target.length === 0}
            click={this.handleSubmit}
          />
        </ButtonContainer>
      </Container>
    );
  }
}

const Container = styled.div``;
const Description = styled.p`
  margin: 0;
  font-size: 18px;
  margin-bottom: 50px;
`;
const ButtonContainer = styled.div`
  display: flex;
  max-width: 475px;
  justify-content: space-between;
  margin-bottom: 200px;
`;

const mapStateToProps = state => ({
  target: state.AHP.target
});
const mapDispatchToProps = { setAhpTarget };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AHPBegin);
