import React, { PureComponent } from 'react';
import Method from './Method';
import styled from 'styled-components';
import methodsData from './methodsData';

class MethodsList extends PureComponent {
  render() {
    return (
      <List>
        {methodsData !== 0
          ? methodsData.map((method, key) => (
              <Method
                key={key}
                title={method.title}
                caption={method.caption}
                img={method.img}
                route={method.route}
                help={method.helplink}
              />
            ))
          : null}
      </List>
    );
  }
}

const List = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
  padding-bottom: 190px;
`;

export default MethodsList;
