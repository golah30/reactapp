import React, { PureComponent } from 'react';

export default class CloseIcon extends PureComponent {
  render() {
    const height = this.props.height || '20';
    const width = this.props.width || '20';
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 22.707 22.707"
      >
        <g
          id="Group_1"
          data-name="Group 1"
          transform="translate(-79.146 -72.146)"
        >
          <line
            id="Line_1"
            data-name="Line 1"
            fill="none"
            x1="22"
            y2="22"
            transform="translate(79.5 72.5)"
          />
          <line
            id="Line_2"
            data-name="Line 2"
            fill="none"
            x2="22"
            y2="22"
            transform="translate(79.5 72.5)"
          />
        </g>
      </svg>
    );
  }
}
