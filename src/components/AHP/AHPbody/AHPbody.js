import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAhpMenu } from '../../../ducks/AHP';
import Header from '../../Header';
import Footer from '../../Footer';
import { SubHeader, AsideMenu } from '../../UI';
import AHPBegin from '../AHPBegin';
import AHPInput from '../AHPInput';
import AHPCompare from '../AHPCompare';
import styled from 'styled-components';
import _ from 'lodash';

class AHPbody extends Component {
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
    }
    if (!_.isEqual(LPRs, prevProps.LPRs)) {
      this.updateMenu(3);
    }
  }

  render() {
    const { menu } = this.props;
    return (
      <Fragment>
        <Header />
        <SubHeader title={'Метод анализа иерархий'} />
        <Container>
          <AsideMenu data={menu} />
          <Content>
            <Switch>
              <Route path="/ahp/begin" exact component={AHPBegin} />
              <Route path="/ahp/input" exact component={AHPInput} />
              <Route path="/ahp/compare/:id" exact component={AHPCompare} />
              <Route path="/ahp/result" exact component={AHPBegin} />
            </Switch>
          </Content>
        </Container>
        <Footer />
      </Fragment>
    );
  }
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
          if (LPRs[i + 1] && !_.isEqual(LPRs[i + 1], {})) {
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
}

const Container = styled.div`
  padding: 0 100px;
  display: flex;
  flex-flow: row nowrap;
`;
const Content = styled.div`
  margin-top: 50px;
  margin-left: 30px;
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
