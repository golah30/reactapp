import React, { PureComponent } from 'react';

export default class LeftArrow extends PureComponent {
  render() {
    const height = this.props.height || '20';
    const width = this.props.width || '20';
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 26.414 28.828"
      >
        <g
          id="Group_2"
          data-name="Group 2"
          transform="translate(-112.086 -60.086)"
        >
          <path
            id="Path_1"
            data-name="Path 1"
            d="M25,0H0"
            transform="translate(113.5 74.5)"
            style={{ fill: 'none', strokeLinecap: 'round', strokeWidth: '2' }}
          />
          <line
            id="Line_4"
            data-name="Line 4"
            x1="13"
            y2="13"
            transform="translate(113.5 61.5)"
            style={{ fill: 'none', strokeLinecap: 'round', strokeWidth: '2' }}
          />
          <line
            id="Line_5"
            data-name="Line 5"
            x1="13"
            y1="13"
            transform="translate(113.5 74.5)"
            style={{ fill: 'none', strokeLinecap: 'round', strokeWidth: '2' }}
          />
        </g>
      </svg>
    );
  }
}
