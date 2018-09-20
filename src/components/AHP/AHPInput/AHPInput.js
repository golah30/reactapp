import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Button, TextInput } from '../../UI';
import { setAhpStage, setAhpPurpose } from '../../../ducks/AHP';

class AHPInput extends React.PureComponent {
  state = {
    target: '',
    comment: ''
  };
  componentDidMount() {
    this.setState({
      target: this.props.purpose.target,
      comment: this.props.purpose.comment
    });
    if (this.props.stage < 1) this.props.setAhpStage(1);
  }
  componentDidUpdate(prevProps) {
    if (this.props.purpose !== prevProps.purpose) {
      this.setState({
        target: this.props.purpose.target,
        comment: this.props.purpose.comment
      });
    }
  }
  render() {
    return (
      <Container>
        <Description>
          Для решения задачи необходимы следущие входные данные:
        </Description>
        <TextInputContainer>
          <TextInput
            title={'Цель:'}
            limit={80}
            name={'target'}
            value={this.state.target}
            change={this.handleChange}
          />
        </TextInputContainer>
        <TextInputContainer>
          <TextInput
            title={'Комментарии:'}
            limit={100}
            name={'comment'}
            value={this.state.comment}
            change={this.handleChange}
          />
        </TextInputContainer>
        <ButtonContainer>
          <Button
            title="Построить граф"
            disabled={true}
            click={this.buildGraph}
          />
          <Button
            title="Далее"
            disabled={
              this.state.target.length === 0 || this.state.comment.length === 0
            }
            click={this.handleSubmit}
          />
        </ButtonContainer>
      </Container>
    );
  }
  handleChange = (name, data) => {
    this.setState({ [name]: data });
  };
  handleSubmit = () => {
    this.props.setAhpPurpose({
      target: this.state.target,
      comment: this.state.comment
    });
    this.props.history.push('/ahp/compare-criteria');
  };
  buildGraph = () => {};
}

const TextInputContainer = styled.div`
  margin-bottom: 50px;
`;
const Container = styled.div``;
const Description = styled.p`
  margin: 0;
  font-size: 18px;
  margin-bottom: 37px;
`;
const ButtonContainer = styled.div`
  display: flex;
  max-width: 475px;
  justify-content: space-between;
  margin-bottom: 200px;
`;

const mapStateToProps = state => ({
  stage: state.AHP.stage,
  purpose: state.AHP.purpose
});
const mapDispatchToProps = { setAhpStage, setAhpPurpose };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AHPInput);
