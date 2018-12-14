import React, { PureComponent } from 'react';
import Vega from '../../../Vega';
import { buildVegaSpec } from './Spec';

export default class Diagram extends PureComponent {
  render() {
    const { output, outputRel, alt, hover } = this.props;
    return (
      <div>
        <Vega
          handler={{ func: hover, signal: 'tooltip' }}
          spec={buildVegaSpec({}, { output, outputRel, alt })}
        />
      </div>
    );
  }
}
