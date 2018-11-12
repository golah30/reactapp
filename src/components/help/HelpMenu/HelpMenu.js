import React from 'react';
import styled from 'styled-components';
import HelpMenuAccordion from './HelpMenuAccordion';

export class HelpMenu extends React.PureComponent {
  render() {
    return (
      <Menu>
        {this.props.data.length !== 0
          ? this.props.data.map((item, key) => (
              <HelpMenuAccordion key={key} category={item} />
            ))
          : 'Help materials are unavailable'}
      </Menu>
    );
  }
}

const Menu = styled.div`
  max-width: 800px;
  min-width: 300px;
  user-select: none;
`;

export default HelpMenu;
