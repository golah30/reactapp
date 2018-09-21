import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Button, TextInput } from '../../UI';
import { setAhpTarget } from '../../../ducks/AHP';

class AHPCompare extends React.PureComponent {
  render() {
    return <div>compare</div>;
  }
}

const mapStateToProps = state => ({
  target: state.AHP.target
});
const mapDispatchToProps = { setAhpTarget };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AHPCompare);
