import React, { PureComponent } from 'react';

export default class Bars extends PureComponent {
  render() {
    const height = this.props.height || '12';
    const width = this.props.width || '14';
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 14 12"
      >
        <g id="Group_3" data-name="Group 3" transform="translate(-91 -61)">
          <g
            id="Rectangle_3"
            data-name="Rectangle 3"
            transform="translate(91 61)"
            style={{ fill: 'none', strokeLinejoin: 'round', strokeWidth: '1' }}
          >
            <rect width="14" height="2" stroke="none" />
            <rect x="0.5" y="0.5" width="13" height="1" fill="none" />
          </g>
          <g
            id="Rectangle_4"
            data-name="Rectangle 4"
            transform="translate(91 66)"
            style={{ fill: 'none', strokeLinejoin: 'round', strokeWidth: '1' }}
          >
            <rect width="14" height="2" stroke="none" />
            <rect x="0.5" y="0.5" width="13" height="1" fill="none" />
          </g>
          <g
            id="Rectangle_5"
            data-name="Rectangle 5"
            transform="translate(91 71)"
            style={{ fill: 'none', strokeLinejoin: 'round', strokeWidth: '1' }}
          >
            <rect width="14" height="2" stroke="none" />
            <rect x="0.5" y="0.5" width="13" height="1" fill="none" />
          </g>
        </g>
      </svg>
    );
  }
}
