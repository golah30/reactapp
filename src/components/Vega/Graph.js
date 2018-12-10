import React from 'react';
import * as vega from 'vega';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    const { spec } = this.props;
    if (spec) {
      let elem = document.createElement('div');

      this.myRef.current.appendChild(elem);

      new vega.View(vega.parse(spec))
        .renderer('canvas')
        .initialize(elem)
        .hover()
        .run();
    }
  }
  componentDidUpdate(prevProps, prevState) {}

  render() {
    return <div ref={this.myRef} />;
  }
}

export default Graph;
