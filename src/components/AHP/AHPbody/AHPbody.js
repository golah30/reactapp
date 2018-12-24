import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import _ from 'lodash';
import alternatives from '../../../ducks/AHP/reducers/alternatives';
import { setAhpMenu } from '../../../ducks/AHP';
import Pallete from '../../../colors';
import Header from '../../Header';
import Footer from '../../Footer';
import { AsideMenu } from '../../UI';
import AHPBegin from '../AHPBegin';
import AHPInput from '../AHPInput';
import AHPCompare from '../AHPCompare';
import AHPResult from '../AHPResult';
import Modal from '../../Modal';
import ModalTreeGraph from '../Graph/Tree/ModalTreeGraph';

class AHPbody extends Component {
  state = {
    showModal: false,
    isModalGraphAvailable: false,
    asideSize: 0
  };
  componentDidMount() {
    this.props.history.push('/ahp/begin');
  }
  componentDidUpdate(prevProps) {
    const { target, purpose, criterias, LPRs } = this.props;
    if (!_.isEqual(target, prevProps.target)) {
      this.updateMenu(1);
    }
    if (
      !_.isEqual(purpose, prevProps.purpose) ||
      !_.isEqual(criterias, prevProps.criterias)
    ) {
      this.updateMenu(2);
      if (!_.isEqual(criterias, {}) && !_.isEqual(alternatives, {}))
        this.setState({ isModalGraphAvailable: true });
    }
    if (!_.isEqual(LPRs, prevProps.LPRs)) {
      this.updateMenu(3);
    }
  }

  render() {
    const { menu } = this.props;
    return (
      <Fragment>
        <Header
          hasAside={true}
          handleAsideMode={this.handleAsideMode}
          asideSubTitle={'Метод анализа иерархий'}
        >
          <AsideMenu data={menu} />
        </Header>
        <Container margin={this.state.asideSize}>
          <ControllContainer disabled={!this.state.isModalGraphAvailable}>
            <Controll
              disabled={!this.state.isModalGraphAvailable}
              onClick={this.openModal}
            >
              Структура задачи
            </Controll>
          </ControllContainer>
          <Switch>
            <Route path="/ahp/begin" exact component={AHPBegin} />
            <Route path="/ahp/input" exact component={AHPInput} />
            <Route path="/ahp/compare/:id" exact component={AHPCompare} />
            <Route path="/ahp/result" exact component={AHPResult} />
          </Switch>
        </Container>
        {this.state.showModal ? (
          <Modal>
            <ModalTreeGraph close={this.closeModal} />
          </Modal>
        ) : null}
        <Footer />
      </Fragment>
    );
  }
  openModal = () => {
    this.setState({ showModal: true });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };
  updateMenu = stage => {
    let menu = _.cloneDeep(this.props.menu);
    const { target, purpose, criterias, LPRs } = this.props;

    if (stage === 1) {
      if (target !== '') {
        menu[stage].isAvailable = true;
      } else {
        menu[stage].isAvailable = false;
      }
    }
    if (stage === 2) {
      if (purpose.target !== '' && criterias.length !== 0) {
        menu[stage].isAvailable = true;
        let childs = criterias.map((item, key) => {
          return {
            title: `По критерию "${item}"`,
            route: `/ahp/compare/${key + 1}`,
            childrens: [],
            isAvailable: false,
            isSubItem: true
          };
        });
        menu[3].childrens = childs;
      } else {
        menu[stage].isAvailable = false;
      }
    }
    if (stage === 3) {
      if (LPRs.length !== 0) {
        if (LPRs[0] && !_.isEqual(LPRs[0], {})) {
          menu[stage].isAvailable = true;
          menu[stage].childrens[0].isAvailable = true;
        } else {
          menu[stage].isAvailable = false;
          menu[stage].childrens[0].isAvailable = false;
        }

        for (let i = 0; i < menu[stage].childrens.length; ++i) {
          if (LPRs[i] && !_.isEqual(LPRs[i], {})) {
            menu[stage].childrens[i].isAvailable = true;
          } else {
            menu[stage].childrens[i].isAvailable = false;
          }
        }
        if (
          LPRs[menu[stage].childrens.length] &&
          !_.isEqual(LPRs[menu[stage].childrens.length], {})
        ) {
          menu[4].isAvailable = true;
        } else {
          menu[4].isAvailable = false;
        }
      }
    }
    this.props.setAhpMenu(menu);
  };
  handleAsideMode = size => {
    this.setState({ asideSize: size });
  };
}

const ControllContainer = styled.div`
  background-color: ${props =>
    props.disabled ? 'tranparent' : Pallete.darkBlue};
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
const Controll = styled.button`
  display: block;
  box-sizing: border-box;
  border: none;
  width: 200px;
  padding-top: 7px;
  padding-bottom: 9px;
  padding-left: 10px;
  padding-right: 20px;
  height: 40px;
  text-align: right;
  margin-left: 0;
  opacity: ${props => (props.disabled ? 0 : 1)};
  background-color: ${Pallete.blue};
  color: ${Pallete.white};
  font-size: 18px;
  font-weight: 400;
  font-family: 'Roboto', sans-serif;
  transition: color 0.4s, background-color 0.4s;
  cursor: ${props => (props.disabled ? 'auto' : 'pointer')};
  &:hover {
    background-color: ${Pallete.darkBlue};
    color: ${Pallete.white};
  }
`;
const Container = styled.div`
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  margin-left: ${props => props.margin + 'px'};
`;

const mapStateToProps = state => ({
  menu: state.AHP.menu,
  target: state.AHP.target,
  purpose: state.AHP.purpose,
  criterias: state.AHP.criterias,
  LPRs: state.AHP.LPRs.data
});

const mapDispatchToProps = { setAhpMenu };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AHPbody);
