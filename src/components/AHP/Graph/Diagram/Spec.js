export const buildVegaSpec = (size, data) => {
  const table = buildTableSpec(data.alt, data.outputRel);

  return spec(400, 200, table);
};
const buildTableSpec = (alt, data) => {
  let table = [];
  for (let i = 0; i < alt.length; ++i) {
    table.push({ category: `A${i + 1}`, value: data[i] });
  }
  return table;
};

const spec = (w, h, table) => {
  return {
    $schema: 'https://vega.github.io/schema/vega/v4.json',
    width: w,
    height: h,
    padding: 5,

    data: [
      {
        name: 'table',
        values: table
      }
    ],
    signals: [
      {
        name: 'tooltip',
        value: {},
        on: [
          { events: 'rect:mouseover', update: 'datum' },
          { events: 'rect:mouseout', update: '{}' }
        ]
      }
    ],

    scales: [
      {
        name: 'xscale',
        type: 'band',
        domain: { data: 'table', field: 'category' },
        range: 'width',
        padding: 0.05,
        round: true
      },
      {
        name: 'yscale',
        domain: { data: 'table', field: 'value' },
        nice: true,
        range: 'height'
      }
    ],

    axes: [
      { orient: 'bottom', scale: 'xscale', offset: 5, labelFontSize: 14 },
      { orient: 'left', scale: 'yscale', offset: 5, labelFontSize: 14 }
    ],

    marks: [
      {
        type: 'rect',
        from: { data: 'table' },
        encode: {
          enter: {
            x: { scale: 'xscale', field: 'category' },
            width: { scale: 'xscale', band: 1 },
            y: { scale: 'yscale', field: 'value' },
            y2: { scale: 'yscale', value: 0 }
          },
          update: {
            fill: { value: 'steelblue' }
          },
          hover: {
            fill: { value: 'red' }
          }
        }
      },
      {
        type: 'text',
        encode: {
          enter: {
            align: { value: 'center' },
            baseline: { value: 'bottom' },
            fill: { value: '#333' }
          },
          update: {
            x: { scale: 'xscale', signal: 'tooltip.category', band: 0.5 },
            y: { scale: 'yscale', signal: 'tooltip.value', offset: -2 },
            text: { signal: 'tooltip.value' },
            fillOpacity: [{ test: 'datum === tooltip', value: 0 }, { value: 1 }]
          }
        }
      }
    ]
  };
};
