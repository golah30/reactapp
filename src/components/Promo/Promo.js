import React from 'react';
import { Link } from 'react-router-dom';

export class Promo extends React.PureComponent {
  render() {
    return <Link to="/main">Next to the Main page</Link>;
  }
}

export default Promo;
