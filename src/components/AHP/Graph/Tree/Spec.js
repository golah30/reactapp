import _ from 'lodash';
export const buildVegaSpec = (size, data) => {
  const Nodes = createNodesSpec(
    400,
    400,
    data.target,
    data.criterias,
    data.alternatives
  );

  let lprsdata = createFakeLPRs(data);
  if (!_.isEqual(data.LPRs, [])) {
    for (let i = 0; i < data.LPRs.length; ++i) {
      if (!_.isEqual(data.LPRs[i], {})) {
        lprsdata[i] = data.LPRs[i].lpr;
      }
    }
  }

  const Edges = createEdgesSpec(
    Nodes,
    data.criterias,
    data.alternatives,
    lprsdata
  );

  return spec(400, 400, Nodes, Edges);
};
const createFakeLPRs = data => {
  let lprsdata = [];
  let crAr = [];
  for (let i = 0; i < data.criterias.length; ++i) {
    crAr.push({ lpr: 0 });
  }
  lprsdata.push(crAr);
  for (let i = 0; i < data.criterias.length; ++i) {
    let alAr = [];
    for (let j = 0; j < data.alternatives.length; ++j) {
      alAr.push({ lpr: 0 });
    }
    lprsdata.push(alAr);
  }
  return lprsdata;
};
const createNodesSpec = (
  canvasWidth,
  canvasHeight,
  target,
  criterias,
  alternatives
) => {
  let values = [];
  // add purpose
  values.push({
    id: 1,
    name: target,
    x: canvasWidth * 0.5,
    y: canvasHeight * 0.1,
    xOffset: -30,
    yOffset: -20
  });
  // calculate and add criterias
  calcDotsPositions(
    values,
    criterias,
    canvasWidth,
    canvasHeight,
    0.2,
    0.4,
    values.length + 1,
    10,
    -15
  );
  // calculate and add alternatives
  calcDotsPositions(
    values,
    alternatives,
    canvasWidth,
    canvasHeight,
    0.1,
    0.8,
    values.length + 1,
    -40,
    20
  );

  return values;
};

const calcDotsPositions = (
  values,
  data,
  canvasWidth,
  canvasHeight,
  xAxisOffset,
  yAxisOffset,
  initialId,
  xOffset,
  yOffset
) => {
  const dotCount = data.length;
  const section = canvasWidth - canvasWidth * xAxisOffset * 2;
  const subSection = section / (dotCount - 1);
  let dotXPosition = canvasWidth * xAxisOffset;
  const dotYPosition = canvasHeight * yAxisOffset;
  values.push({
    id: initialId,
    name: data[0],
    x: Math.round(dotXPosition),
    y: dotYPosition,
    xOffset,
    yOffset
  });
  for (let i = 1; i < dotCount; ++i) {
    dotXPosition = dotXPosition + subSection;
    values.push({
      id: initialId + i,
      name: data[i],
      x: Math.round(dotXPosition),
      y: dotYPosition,
      xOffset,
      yOffset
    });
  }
};

const createEdgesSpec = (Nodes, criterias, alternatives, LPRs) => {
  let edges = [];
  // s - source, t - target, (x,y) - label position, name - label value
  // add edges from purpose to criterias
  let SourceIndex = 0;
  for (let i = 0; i < criterias.length; ++i) {
    let x = (Nodes[SourceIndex].x + Nodes[i + 1].x) / 2;
    let y = (Nodes[SourceIndex].y + Nodes[i + 1].y) / 2;
    let xOffset = 0;
    let yOffset = 0;
    edges.push({
      s: Nodes[SourceIndex].id,
      t: Nodes[i + 1].id,
      x,
      y,
      xOffset,
      yOffset,
      name: LPRs[0][i].lpr
    });
  }
  // add edges from criterias to alternatives
  const FirstAlternativeIndex = criterias.length + 1;
  for (let i = 0; i < criterias.length; ++i) {
    SourceIndex = 1 + i;
    for (let j = 0; j < alternatives.length; ++j) {
      let x = (Nodes[SourceIndex].x + Nodes[j + FirstAlternativeIndex].x) / 2;
      let y = (Nodes[SourceIndex].y + Nodes[j + FirstAlternativeIndex].y) / 2;
      let xOffset = 10;
      let yOffset = 0;
      edges.push({
        s: Nodes[SourceIndex].id,
        t: Nodes[j + FirstAlternativeIndex].id,
        x,
        y,
        xOffset,
        yOffset,
        name: LPRs[i + 1][j].lpr
      });
    }
  }
  return edges;
};
const spec = (w, h, Nodes, Edges) => {
  return {
    $schema: 'https://vega.github.io/schema/vega/v4.json',
    width: w,
    height: h,
    autosize: 'none',
    signals: [
      {
        name: 'active',
        value: null,
        on: [
          { events: 'symbol:mouseover', update: 'datum.id' },
          { events: 'symbol:mouseout', update: 'null' },
          { events: 'text:mouseover', update: 'datum.id' },
          { events: 'text:mouseout', update: 'null' }
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
        values: Nodes,
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
        values: Edges,
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
            ],
            opacity: [
              { test: 'datum.s === active', value: 1 },
              { test: 'datum.t === active', value: 1 },
              {
                test: 'datum.t === activepath.t && datum.s === activepath.s',
                value: 1
              },
              { value: 0.6 }
            ],
            strokeWidth: [
              { test: 'datum.s === active', value: 3 },
              { test: 'datum.t === active', value: 3 },
              {
                test: 'datum.t === activepath.t && datum.s === activepath.s',
                value: 3
              },
              { value: 2 }
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
            y: { field: 'y', offset: 0 },
            tooltip: { field: 'name' }
          },
          update: {
            fill: [
              { test: 'datum.id === active', value: 'steelblue' },
              { value: '#444444' }
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
            x: { field: 'x', offset: { field: 'xOffset' } },
            y: { field: 'y', offset: { field: 'yOffset' } },
            tooltip: { field: 'name' }
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
        from: { data: 'edges' },
        encode: {
          enter: {
            text: { field: 'name' },
            fontSize: { value: 14 },
            fill: { value: 'black' },
            baseline: { value: 'middle' },
            x: { field: 'x', offset: { field: 'xOffset' } },
            y: { field: 'y', offset: { field: 'yOffset' } }
          },
          update: {
            fill: [
              { test: 'datum.t === active', value: 'green' },
              { test: 'datum.s === active', value: 'steelblue' },
              {
                test: 'datum.t === activepath.t && datum.s === activepath.s',
                value: 'steelblue'
              },
              { value: 'black' }
            ],
            opacity: [
              { test: 'datum.s === 1', value: 1 },
              { test: 'datum.t === active || datum.s === active', value: 1 },
              {
                test: 'datum.t === activepath.t && datum.s === activepath.s',
                value: 1
              },
              { value: 0 }
            ],
            zindex: [
              { test: 'datum.t === active || datum.s === active', value: 100 },
              {
                test: 'datum.t === activepath.t && datum.s === activepath.s',
                value: 100
              },
              { value: 0 }
            ],
            fontWeight: [
              {
                test: 'datum.t === active || datum.s === active',
                value: 'bold'
              },
              {
                test: 'datum.t === activepath.t && datum.s === activepath.s',
                value: 'bold'
              },
              { value: 'normal' }
            ]
          }
        }
      }
    ]
  };
};
