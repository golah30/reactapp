import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { setAhpTarget, setAhpStage } from '../../../ducks/AHP';

class AHPCompare extends React.PureComponent {
  componentDidMount() {
    if (this.props.stage.main < 2)
      this.props.setAhpStage({
        main: 2,
        isSub: false,
        sub: 0
      });
  }
  render() {
    return <div>compare</div>;
  }
}

const Container = styled.div``;

const mapStateToProps = state => ({
  stage: state.AHP.stage,
  target: state.AHP.target
});
const mapDispatchToProps = { setAhpStage, setAhpTarget };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AHPCompare);
