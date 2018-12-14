import React from 'react';
import * as vega from 'vega';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    const { spec, handler } = this.props;
    if (spec) {
      let elem = document.createElement('div');

      this.myRef.current.appendChild(elem);

      let view = new vega.View(vega.parse(spec))
        .renderer('canvas')
        .initialize(elem)
        .hover();

      if (handler) view.addSignalListener(handler.signal, handler.func);
      view.run();
    }
  }
  componentDidUpdate(prevProps, prevState) {}

  render() {
    return <div ref={this.myRef} />;
  }
}

export default Graph;
