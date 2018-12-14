import React, { PureComponent } from 'react';
import Chart from 'chart.js';

export default class Radial extends PureComponent {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount = () => {
    const { criterias } = this.props;
    let node = document.createElement('canvas');
    node.setAttribute('width', 200);
    node.setAttribute('height', 200);

    this.myRef.current.appendChild(node);
    if (criterias.length > 2) {
      new Chart(node, {
        type: 'radar',
        data: this.buildDataFromProps(),
        options: {
          legend: {
            labels: {
              defaultFontSize: 14
            }
          }
        }
      });
    } else {
      new Chart(node, {
        type: 'line',
        data: this.buildLineDataFromProps(),
        options: {
          legend: {
            labels: {
              defaultFontSize: 14
            }
          }
        }
      });
    }
  };
  buildLineDataFromProps = () => {
    const { alternatives, set, criterias, LPRs } = this.props;
    let data = {
      labels: criterias,
      datasets: []
    };
    for (let i = 0; i < set.length; ++i) {
      let lprs = [];
      for (let j = 0; j < criterias.length; ++j) {
        lprs.push(LPRs[j + 1].lpr[set[i]]);
      }
      data.datasets.push({
        data: lprs,
        label: alternatives[set[i]],
        pointBackgroundColor: this.getColor(i),
        borderColor: this.getColor(i),
        backgroundColor: `rgba(${this.getBackground(i)},0.2)`,
        pointRadius: 3
      });
    }
    return data;
  };
  buildDataFromProps = () => {
    const { alternatives, set, criterias, LPRs } = this.props;
    let data = {
      labels: criterias,
      datasets: []
    };
    for (let i = 0; i < set.length; ++i) {
      let lprs = [];
      for (let j = 0; j < criterias.length; ++j) {
        lprs.push(LPRs[j + 1].lpr[set[i]]);
      }
      data.datasets.push({
        data: lprs,
        label: alternatives[set[i]],
        borderColor: this.getColor(i),
        backgroundColor: `rgba(${this.getBackground(i)},0.2)`,
        pointBackgroundColor: this.getColor(i),
        pointRadius: 3
      });
    }
    return data;
  };

  getColor = value => {
    const colors = [
      '#3f51b5',
      '#ff5722',
      '#607d8b',
      '#43a047',
      '#880e4f',
      '#ffff00',
      '#00796b',
      '#5e35b1',
      '#424242',
      '#ffa000'
    ];
    return colors[value];
  };
  getBackground = value => {
    const colors = [
      '159,168,218',
      '255,171,145',
      '176,190,197',
      '165,214,167',
      '248,187,208',
      '255,245,157',
      '178,223,219',
      '209,196,233',
      '238,238,238',
      '255,236,179'
    ];
    return colors[value];
  };
  render() {
    return <div ref={this.myRef} />;
  }
}
