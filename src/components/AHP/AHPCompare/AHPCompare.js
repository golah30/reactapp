import React, { Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import _ from 'lodash';
import { LPRTable, Indicators, Button, RadioGroup, TextInput } from '../../UI';
import { setAhpTarget, ahpLprRequest, ahpLprSuccess } from '../../../ducks/AHP';
import Modal from '../../Modal';
import ModalLineGraph from '../Graph/Line/ModalLineGraph';

class AHPCompare extends React.Component {
  state = {
    table: [],
    isTableValid: false,
    radio: {},
    comment: '',
    showModal: false
  };
  componentDidMount() {
    const { LPRs, criterias } = this.props;
    const id = parseInt(this.props.match.params.id, 10);

    if (id === 0) {
      if (LPRs.length !== criterias.length + 1) {
        let array = [{}];
        for (let i = 0; i < criterias.length; ++i) array.push({});
        this.props.ahpLprSuccess(array);
      }
    }

    if (LPRs[id] && LPRs[id].comment) {
      this.setState({ comment: LPRs[id].comment });
    }
  }

  render() {
    const pageId = parseInt(this.props.match.params.id, 10);
    const { criterias, alternatives, LPRs } = this.props;

    return (
      <Container>
        <Heading>
          {pageId === 0 ? (
            <Fragment>
              <PurposeLabel>
                Выберите способ сравнения критериев по цели:{' '}
              </PurposeLabel>
              <Purpose>{this.props.target}</Purpose>
            </Fragment>
          ) : (
            <Fragment>
              <PurposeLabel>
                Выберите способ сравнения альтернатив по критерию
              </PurposeLabel>
              <Purpose>"{this.props.criterias[pageId - 1]}"</Purpose>
            </Fragment>
          )}
        </Heading>
        <RadioGroupContainer>
          <RadioGroup
            value={
              LPRs[pageId] && LPRs[pageId].radio ? LPRs[pageId].radio : null
            }
            change={this.handleRadioChange}
          />
        </RadioGroupContainer>
        <LPRTable
          values={
            LPRs[pageId] && LPRs[pageId].table ? LPRs[pageId].table : null
          }
          localPriorities={
            LPRs[pageId] && LPRs[pageId].lpr ? LPRs[pageId].lpr : null
          }
          radio={this.state.radio}
          comparedItems={pageId === 0 ? criterias : alternatives}
          change={this.handleTableChange}
        />
        <Indicators
          values={
            LPRs[pageId] && LPRs[pageId].indicators
              ? LPRs[pageId].indicators
              : null
          }
        />
        <TextInputContainer>
          <TextInput
            title={'Комментарии:'}
            limit={100}
            name={'comment'}
            value={this.state.comment}
            change={this.handleCommentChange}
          />
        </TextInputContainer>
        <ButtonContainer>
          <Button
            title={'Вычислить'}
            disabled={!this.state.isTableValid}
            click={this.calcLPRs}
          />
          <Button
            title={'Ценность информации'}
            disabled={!(LPRs[pageId] && !_.isEqual(LPRs[pageId], {}))}
            click={this.openModal}
          />
          <Button
            title="Далее"
            disabled={!(LPRs[pageId] && !_.isEqual(LPRs[pageId], {}))}
            click={this.handleSubmit}
          />
        </ButtonContainer>
        {this.state.showModal ? (
          <Modal>
            <ModalLineGraph
              alternatives={pageId === 0 ? criterias : alternatives}
              LPRs={LPRs[pageId]}
              close={this.closeModal}
            />
          </Modal>
        ) : null}
      </Container>
    );
  }
  openModal = () => {
    this.setState({ showModal: true });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };
  handleSubmit = () => {
    const { LPRs } = this.props;
    const id = parseInt(this.props.match.params.id, 10);
    const length = LPRs.length;
    if (LPRs[id] && !_.isEqual(LPRs[id], {})) {
      if (id + 1 < length) {
        this.props.history.push(`/ahp/compare/${id + 1}`);
      } else {
        this.props.history.push('/ahp/result');
      }
    }
  };
  calcLPRs = () => {
    const { table, radio, comment } = this.state;
    const id = this.props.match.params.id;

    this.props.ahpLprRequest({
      id: id,
      table: table,
      radio: radio,
      comment: comment
    });
  };
  isValid = () => {
    const table = this.state.table;

    if (table.length === 0) return this.setState({ isTableValid: false });
    for (let row of table)
      for (let cell of row)
        if (!cell.valid) return this.setState({ isTableValid: false });

    return this.setState({ isTableValid: true });
  };
  handleCommentChange = (name, data) => {
    this.setState({ [name]: data });
  };
  handleTableChange = cells => {
    this.setState({ table: cells }, this.isValid);
  };
  handleRadioChange = radio => {
    this.setState({ radio: radio });
  };
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
const Heading = styled.div`
  margin-bottom: 40px;
`;
const PurposeLabel = styled.span`
  font-size: 18px;
  margin-right: 10px;
`;
const Purpose = styled.span`
  margin: 0;
  width: 538px;
  font-size: 18px;
`;
const TextInputContainer = styled.div`
  margin-bottom: 50px;
`;
const RadioGroupContainer = styled.div`
  margin-bottom: 30px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  & button {
    margin-left: 10px;
  }
  & button:nth-child(1) {
    margin-left: 0px;
  }
`;

const mapStateToProps = state => ({
  stage: state.AHP.stage,
  target: state.AHP.purpose.target,
  LPRs: state.AHP.LPRs.data,
  criterias: state.AHP.criterias,
  alternatives: state.AHP.alternatives
});
const mapDispatchToProps = {
  setAhpTarget,
  ahpLprRequest,
  ahpLprSuccess
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AHPCompare);
