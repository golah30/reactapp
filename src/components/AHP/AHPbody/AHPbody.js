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

class AHPbody extends Component {
  componentDidMount() {
    this.props.history.push('/ahp/begin');
  }
  componentDidUpdate(prevProps) {
    if (this.props.stage !== prevProps.stage) this.updateMenu(this.props.stage);
    if (
      JSON.stringify(this.props.criterias) !==
      JSON.stringify(prevProps.criterias)
    ) {
      this.updateMenuStruct(this.props.criterias);
      this.forceUpdate();
    }
  }

  render() {
    const { menu } = this.props;
    return (
      <Fragment>
        <Header />
        <SubHeader title={'Метод анализа иерархий'} />
        <Container>
          <AsideMenu data={menu}>{}</AsideMenu>
          <Content>
            <Switch>
              <Route path="/ahp/begin" exact component={AHPBegin} />
              <Route path="/ahp/input" exact component={AHPInput} />
              <Route
                path="/ahp/compare-criteria"
                exact
                component={AHPCompare}
              />
              <Route path="/ahp/compare/:id" exact component={AHPBegin} />
              <Route path="/ahp/result" exact component={AHPBegin} />
            </Switch>
          </Content>
        </Container>
        <Footer />
      </Fragment>
    );
  }
  updateMenu = stage => {
    let menu = this.props.menu;
    if (stage.isSub) {
      menu[stage.main].childrens[stage.sub].isAvailable = true;
    } else {
      menu[stage.main].isAvailable = true;
    }
    this.props.setAhpMenu(menu);
  };
  updateMenuStruct = criterias => {
    let menu = this.props.menu;
    let childs = [];
    for (let index = 0; index < criterias.length; ++index) {
      childs.push({
        title: `По критерию "${criterias[index]}"`,
        route: `/ahp/compare/${index}`,
        childrens: [],
        isAvailable: false,
        isSubItem: true
      });
    }
    menu[3].childrens = childs;
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
  stage: state.AHP.stage,
  criterias: state.AHP.criterias
});

const mapDispatchToProps = { setAhpMenu };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AHPbody);
