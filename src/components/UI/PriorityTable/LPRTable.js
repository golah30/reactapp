import React, { PureComponent } from 'react';
import CompareTypeTable from './CompareTypeTable';
import ManualTypeTable from './ManualTypeTable';
import RelativeTypeTable from './RelativeTypeTable';

export default class LPRTable extends PureComponent {
  render() {
    const {
      radio,
      values,
      change,
      localPriorities,
      comparedItems
    } = this.props;

    if (radio.type === 'insert') {
      return (
        <ManualTypeTable
          comparedItems={comparedItems}
          values={values}
          change={change}
          localPriorities={localPriorities}
          mode={radio.insert}
        />
      );
    }
    if (radio.type === 'compare') {
      return (
        <CompareTypeTable
          comparedItems={comparedItems}
          values={values}
          change={change}
          localPriorities={localPriorities}
        />
      );
    }
    if (radio.type === 'relative') {
      return (
        <RelativeTypeTable
          comparedItems={comparedItems}
          values={values}
          change={change}
          localPriorities={localPriorities}
          mode={radio.relative}
        />
      );
    }
    return null;
  }
}
