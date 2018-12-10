export const buildVegaSpec = () => {
  return spec();
};
const spec = () => {
  return {
    $schema: 'https://vega.github.io/schema/vega/v4.json',
    width: 300,
    height: 300,
    autosize: 'none',
    signals: [
      {
        name: 'active',
        value: null,
        on: [
          { events: 'symbol:mouseover', update: 'datum.id' },
          { events: 'symbol:mouseout', update: 'null' }
        ]
      },
      {
        name: 'activepath',
        value: {},
        on: [
          {
            events: 'path:mouseover',
            update: 'datum'
          },
          { events: 'path:mouseout', update: '{}' }
        ]
      }
    ],
    data: [
      {
        name: 'nodes',
        values: [
          { id: 2, x: 150, y: 150, name: 'A1' },
          { id: 3, x: 50, y: 275, name: 'A2' },
          { id: 5, x: 250, y: 275, name: 'A3' },
          { id: 6, x: 50, y: 25, name: 'A4' },
          { id: 7, x: 250, y: 25, name: 'A5' }
        ],
        transform: [
          { type: 'formula', expr: 'atan2(datum.y, datum.x)', as: 'angle' },
          {
            type: 'formula',
            expr: 'sqrt(datum.y * datum.y + datum.x * datum.x)',
            as: 'radius'
          },
          { type: 'formula', expr: 'datum.x', as: 'v0' },
          { type: 'formula', expr: 'datum.y', as: 'v1' }
        ]
      },
      {
        name: 'edges',
        values: [
          { s: 2, t: 3, x: 100, y: 212.5, name: 'val1' },
          { s: 2, t: 5, x: 200, y: 212.5, name: 'val2' },
          { s: 2, t: 6, x: 100, y: 87.5, name: 'val3' },
          { s: 2, t: 7, x: 200, y: 87.5, name: 'val4' },
          { s: 7, t: 5, x: 250, y: 150, name: 'val5' }
        ],
        transform: [
          {
            type: 'lookup',
            from: 'nodes',
            key: 'id',
            fields: ['s', 't'],
            as: ['source', 'target']
          },
          {
            type: 'linkpath',
            sourceX: 'source.v0',
            sourceY: 'source.v1',
            targetX: 'target.v0',
            targetY: 'target.v1',
            orient: 'vertical',
            shape: 'diagonal'
          }
        ]
      }
    ],
    marks: [
      {
        type: 'path',
        from: { data: 'edges' },
        encode: {
          enter: {
            stroke: { value: '#ccc' },
            strokeWidth: { value: 2 },
            x: { value: 0 },
            y: { value: 0 },
            tooltip: { field: 'name' }
          },
          update: {
            path: { field: 'path' },
            stroke: [
              { test: 'datum.s === active', value: 'steelblue' },
              { test: 'datum.t === active', value: 'green' },
              {
                test: 'datum.t === activepath.t && datum.s === activepath.s',
                value: 'steelblue'
              },
              { value: '#ccc' }
            ]
          }
        }
      },
      {
        type: 'symbol',
        from: { data: 'nodes' },
        encode: {
          enter: {
            size: { value: 200 },
            fill: [
              { test: 'datum.id === active', value: 'steelblue' },
              { value: 'black' }
            ],
            x: { field: 'x', offset: 0 },
            y: { field: 'y', offset: 0 }
          },
          update: {
            fill: [
              { test: 'datum.id === active', value: 'steelblue' },
              { value: 'black' }
            ]
          }
        }
      },
      {
        type: 'text',
        from: { data: 'nodes' },
        encode: {
          enter: {
            text: { field: 'name' },
            fontSize: { value: 14 },
            fill: { value: 'black' },
            baseline: { value: 'middle' },
            x: { field: 'x', offset: 10 },
            y: { field: 'y', offset: 0 }
          },
          update: {
            fill: [
              { test: 'datum.id === active', value: 'red' },
              { value: 'black' }
            ]
          }
        }
      },
      {
        type: 'text',
        from: { data: 'edges' },
        encode: {
          enter: {
            text: { field: 'name' },
            fontSize: { value: 14 },
            fill: { value: 'black' },
            baseline: { value: 'middle' },
            x: { field: 'x', offset: 0 },
            y: { field: 'y', offset: 0 }
          },
          update: {
            fill: [
              { test: 'datum.t === active', value: 'green' },
              {
                test: 'datum.t === activepath.t && datum.s === activepath.s',
                value: 'steelblue'
              },
              { value: 'black' }
            ]
          }
        }
      }
    ]
  };
};
