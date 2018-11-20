import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Button, TextInput, DataList } from '../../UI';
import {
  setAhpStage,
  setAhpPurpose,
  setAhpCriterias,
  setAhpAlternatives
} from '../../../ducks/AHP';

class AHPInput extends React.PureComponent {
  state = {
    target: '',
    comment: '',
    criterias: [],
    alternatives: [],
    isValid: false
  };
  componentDidMount() {
    this.setState(
      {
        target: this.props.purpose.target,
        comment: this.props.purpose.comment,
        criterias: this.props.criterias,
        alternatives: this.props.alternatives
      },
      () => {
        let isValid = this.isValid();
        this.setState({ isValid: isValid });
      }
    );

    if (this.props.stage.main < 1)
      this.props.setAhpStage({
        main: 1,
        isSub: false,
        sub: 0
      });
  }
  componentDidUpdate(prevProps) {
    if (this.props.purpose !== prevProps.purpose) {
      this.setState({
        target: this.props.purpose.target,
        comment: this.props.purpose.comment
      });
    }
    if (this.props.criterias !== prevProps.criterias) {
      this.setState({
        criterias: this.props.criterias
      });
    }
    if (this.props.criterias !== prevProps.criterias) {
      this.setState({
        alternatives: this.props.alternatives
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
        <DataLists>
          <DataList
            title={'Критерии'}
            itemTitle={'Кр'}
            defaultCount={2}
            name="criterias"
            value={
              this.props.criterias.length !== 0
                ? this.props.criterias
                : this.state.criterias
            }
            change={this.handleChange}
          />
          <DataList
            title={'Альтернативы'}
            itemTitle={'А'}
            defaultCount={2}
            name="alternatives"
            value={
              this.props.alternatives.length !== 0
                ? this.props.alternatives
                : this.state.alternatives
            }
            change={this.handleChange}
          />
        </DataLists>
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
            disabled={!this.state.isValid}
            click={this.handleSubmit}
          />
        </ButtonContainer>
      </Container>
    );
  }
  handleChange = (name, data) => {
    this.setState({ [name]: data }, () => {
      let isValid = this.isValid();
      this.setState({ isValid: isValid });
    });
  };
  handleSubmit = () => {
    this.props.setAhpPurpose({
      target: this.state.target,
      comment: this.state.comment
    });
    this.props.setAhpCriterias(this.state.criterias);
    this.props.setAhpAlternatives(this.state.alternatives);
    this.props.history.push('/ahp/compare/0');
  };
  isValid = () => {
    if (this.state.target.length === 0) return false;
    if (this.state.alternatives.length < 2 || this.state.criterias.length < 2)
      return false;
    for (let i = 0; i < this.state.criterias.length; ++i) {
      if (this.state.criterias[i] === '') return false;
    }
    for (let i = 0; i < this.state.alternatives.length; ++i) {
      if (this.state.alternatives[i] === '') return false;
    }
    return true;
  };
  buildGraph = () => {};
}

const DataLists = styled.div`
  min-width: 481px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;
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
  purpose: state.AHP.purpose,
  criterias: state.AHP.criterias,
  alternatives: state.AHP.alternatives
});
const mapDispatchToProps = {
  setAhpStage,
  setAhpPurpose,
  setAhpCriterias,
  setAhpAlternatives
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AHPInput);
