import _ from 'lodash';
export const buildVegaSpec = (size, data) => {
  let siz =
    data.criterias.length > data.alternatives.length
      ? data.criterias.length
      : data.alternatives.length;
  siz = siz * 100 + 100;
  const Nodes = createNodesSpec(
    siz,
    600,
    data.target,
    data.criterias,
    data.alternatives
  );

  let lprsdata = createFakeLPRs(data);
  if (!_.isEqual(data.LPRs, [])) {
    for (let i = 0; i < data.LPRs.length; ++i) {
      if (!_.isEqual(data.LPRs[i], {})) {
        let lprsWeights = calcWeights(data.LPRs[i].lpr);
        let lprs = [];
        for (let j = 0; j < data.LPRs[i].lpr.length; ++j) {
          lprs.push({ lpr: data.LPRs[i].lpr[j], weight: lprsWeights[j] });
        }
        lprsdata[i] = lprs;
      }
    }
  }

  const Edges = createEdgesSpec(
    Nodes,
    data.criterias,
    data.alternatives,
    lprsdata
  );

  return spec(siz, 600, Nodes, Edges);
};
const calcWeights = lprs => {
  let max = parseFloat(lprs[0]);
  for (let i = 0; i < lprs.length; ++i) {
    if (max < parseFloat(lprs[i])) max = parseFloat(lprs[i]);
  }
  let weights = [];
  for (let i = 0; i < lprs.length; ++i) {
    weights.push((parseFloat(lprs[i]) / max) * 100);
  }
  return weights;
};
const createFakeLPRs = data => {
  let lprsdata = [];
  let crAr = [];
  for (let i = 0; i < data.criterias.length; ++i) {
    crAr.push({ lpr: '', weight: 0 });
  }
  lprsdata.push(crAr);
  for (let i = 0; i < data.criterias.length; ++i) {
    let alAr = [];
    for (let j = 0; j < data.alternatives.length; ++j) {
      alAr.push({ lpr: '', weight: 0 });
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
    y: canvasHeight * 0.2,
    yOffset: -20
  });
  // calculate and add criterias
  calcDotsPositions(
    values,
    criterias,
    canvasWidth,
    canvasHeight,
    0.2,
    0.5,
    values.length + 1,
    -15
  );
  // calculate and add alternatives
  calcDotsPositions(
    values,
    alternatives,
    canvasWidth,
    canvasHeight,
    0.15,
    0.85,
    values.length + 1,
    20
  );

  return values;
};

const getColorByLPRWeight = value => {
  const colors = [
    '#55FF00',
    '#7FFF00',
    '#AAFF00',
    '#D4FF00',
    '#FFFF00',
    '#FFD400',
    '#FFAA00',
    '#FF7F00',
    '#FF5500',
    '#FF2A00'
  ];
  if (value < 10) return colors[0];
  if (value < 20) return colors[1];
  if (value < 30) return colors[2];
  if (value < 40) return colors[3];
  if (value < 50) return colors[4];
  if (value < 60) return colors[5];
  if (value < 70) return colors[6];
  if (value < 80) return colors[7];
  if (value < 90) return colors[8];
  if (value <= 100) return colors[9];
};
const calcDotsPositions = (
  values,
  data,
  canvasWidth,
  canvasHeight,
  xAxisOffset,
  yAxisOffset,
  initialId,
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
    yOffset
  });
  for (let i = 1; i < dotCount; ++i) {
    dotXPosition = dotXPosition + subSection;
    values.push({
      id: initialId + i,
      name: data[i],
      x: Math.round(dotXPosition),
      y: dotYPosition,
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
    let { x, y } = calcTextCoordsByKoef(Nodes[SourceIndex], Nodes[i + 1], 0.35);
    let xOffset = 0;
    let yOffset = 0;
    edges.push({
      s: Nodes[SourceIndex].id,
      t: Nodes[i + 1].id,
      x,
      y,
      x1: x,
      y1: y,
      xOffset,
      yOffset,
      color: getColorByLPRWeight(LPRs[0][i].weight),
      name: LPRs[0][i].lpr
    });
  }
  // add edges from criterias to alternatives
  const FirstAltIndex = criterias.length + 1;
  for (let i = 0; i < criterias.length; ++i) {
    SourceIndex = 1 + i;
    for (let j = 0; j < alternatives.length; ++j) {
      let C = calcTextCoordsByKoef(
        Nodes[SourceIndex],
        Nodes[j + FirstAltIndex],
        0.2
      );
      let C1 = calcTextCoordsByKoef(
        Nodes[SourceIndex],
        Nodes[j + FirstAltIndex],
        0.8
      );
      let xOffset = 10;
      let yOffset = 0;
      edges.push({
        s: Nodes[SourceIndex].id,
        t: Nodes[j + FirstAltIndex].id,
        x: C.x,
        y: C.y,
        x1: C1.x,
        y1: C1.y,
        xOffset,
        yOffset,
        color: getColorByLPRWeight(LPRs[i + 1][j].weight),
        name: LPRs[i + 1][j].lpr
      });
    }
  }
  return edges;
};
const calcTextCoordsByKoef = (A, B, k) => {
  let x, y;
  // imitate the  Bézier Curve
  // P = (1−t)3P1 + 3(1−t)2tP2 +3(1−t)t2P3 + t3P4
  let P1, P2, P3, P4, t;
  const centerPointY = (A.y + B.y) / 2;
  if (A.x >= B.x) {
    P1 = { x: B.x, y: B.y };
    P2 = { x: B.x, y: centerPointY };
    P3 = { x: A.x, y: centerPointY };
    P4 = { x: A.x, y: A.y };
    t = k;
  } else {
    P1 = { x: A.x, y: A.y };
    P2 = { x: A.x, y: centerPointY };
    P3 = { x: B.x, y: centerPointY };
    P4 = { x: B.x, y: B.y };
    t = 1 - k;
  }
  x =
    Math.pow(1 - t, 3) * P1.x +
    3 * Math.pow(1 - t, 2) * t * P2.x +
    3 * (1 - t) * Math.pow(t, 2) * P3.x +
    Math.pow(t, 3) * P4.x;
  y =
    Math.pow(1 - t, 3) * P1.y +
    3 * Math.pow(1 - t, 2) * t * P2.y +
    3 * (1 - t) * Math.pow(t, 2) * P3.y +
    Math.pow(t, 3) * P4.y;
  return { x, y };
};
const spec = (w, h, Nodes, Edges) => {
  return {
    $schema: 'https://vega.github.io/schema/vega/v4.json',
    width: w,
    height: h,
    autosize: 'none',
    signals: [
      {
        name: 'showall',
        value: false,
        bind: { input: 'checkbox', name: 'Отобразить все данные' }
      },
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
            strokeWidth: { value: 3 },
            x: { value: 0 },
            y: { value: 0 },
            tooltip: { field: 'name' }
          },
          update: {
            path: { field: 'path' },
            stroke: [
              { test: 'datum.s === active', field: 'color' },
              { test: 'datum.t === active', field: 'color' },
              {
                test: 'datum.t === activepath.t && datum.s === activepath.s',
                field: 'color'
              },
              { test: 'showall === true', field: 'color' },
              { value: '#ccc' }
            ],
            opacity: [
              { test: 'datum.s === active', value: 1 },
              { test: 'datum.t === active', value: 1 },
              {
                test: 'datum.t === activepath.t && datum.s === activepath.s',
                value: 1
              },
              { value: 0.7 }
            ],
            strokeWidth: [
              { test: 'datum.s === active', value: 3 },
              { test: 'datum.t === active', value: 3 },
              {
                test: 'datum.t === activepath.t && datum.s === activepath.s',
                value: 3
              },
              { value: 3 }
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
            fontSize: { value: 16 },
            fill: { value: 'black' },
            baseline: { value: 'middle' },
            x: { field: 'x', offset: 0 },
            y: { field: 'y', offset: { field: 'yOffset' } },
            tooltip: { field: 'name' },
            align: { value: 'center' },
            limit: { value: 100 }
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
            fontSize: { value: 16 },
            fill: { value: 'black' },
            align: { value: 'center' },
            baseline: { value: 'middle' },
            x: { field: 'x', offset: 0 },
            y: { field: 'y', offset: 0 }
          },
          update: {
            x: [{ test: 'datum.s === active', field: 'x' }, { field: 'x1' }],
            y: [{ test: 'datum.s === active', field: 'y' }, { field: 'y1' }],
            opacity: [
              { test: 'datum.s === 1', value: 1 },
              { test: 'datum.t === active || datum.s === active', value: 1 },
              {
                test: 'datum.t === activepath.t && datum.s === activepath.s',
                value: 1
              },
              { test: 'showall === true', value: 1 },
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
      },
      {
        type: 'text',
        encode: {
          enter: {
            text: { value: 'Иерархическая структура задачи' },
            fontSize: { value: 16 },
            fill: { value: 'black' },
            baseline: { value: 'middle' },
            align: { value: 'center' },
            x: { value: w / 2, offset: 0 },
            y: { value: h * 0.05, offset: 0 }
          }
        }
      }
    ]
  };
};
