import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAhpMenu } from '../../../ducks/AHP';
import Header from '../../Header';
import Footer from '../../Footer';
import { SubHeader, AsideMenu } from '../../UI';
import AHPBegin from '../AHPBegin';
import AHPInput from '../AHPInput';
import styled from 'styled-components';

class AHPbody extends Component {
  componentDidMount() {
    this.props.history.push('/ahp/begin');
  }
  componentDidUpdate(prevProps) {
    if (this.props.stage !== prevProps.stage) {
      this.updateMenu(this.props.stage);
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
              <Route path="/ahp/compare-criteria" exact component={AHPBegin} />
              <Route path="/ahp/result" exact component={AHPBegin} />
              {this.routeBuilder()}
            </Switch>
          </Content>
        </Container>
        <Footer />
      </Fragment>
    );
  }

  updateMenu = id => {
    let menu = this.props.menu;
    menu[id].isAvailable = true;
    this.props.setAhpMenu(menu);
  };

  routeBuilder = () => {
    return <Route path="/ahp/builded" exact component={AHPBegin} />;
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
  stage: state.AHP.stage
});

const mapDispatchToProps = { setAhpMenu };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AHPbody);
