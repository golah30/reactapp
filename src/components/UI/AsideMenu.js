import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export default class AsideMenu extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <Aside>
        <Menu>{data && data.map(this.mapCallback)}</Menu>
      </Aside>
    );
  }

  mapCallback = (item, key) => {
    if (item.childrens.length === 0) {
      return item.route === '' ? (
        <Li key={key}>{item.title}</Li>
      ) : (
        <Link
          key={key}
          isAvailable={item.isAvailable}
          isSubItem={item.isSubItem}
        >
          <NavLink to={item.route} activeStyle={Active}>
            {item.title}
          </NavLink>
        </Link>
      );
    } else {
      return (
        <Fragment key={key}>
          <Li>{item.title}</Li>
          {item.childrens.map(this.mapCallback)}
        </Fragment>
      );
    }
  };
}

const Aside = styled.div``;
const Menu = styled.ul`
  box-sizing: border-box;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 50px;
  width: 455px;
  border-right: 1px solid #62a3ff;
`;
const Li = styled.li`
  box-sizing: border-box;
  padding-top: 10px;
  padding-bottom: 13px;
  padding-left: 25px;
  font-size: 20px;
  font-weight: 400;
  border-left: 5px solid transparent;
  cursor: 'default';
`;
const Link = styled.div`
  & a {
    display: block;
    box-sizing: border-box;
    text-decoration: none;
    padding-top: 10px;
    padding-bottom: 13px;
    padding-left: 25px;
    margin-left: ${props => (props.isSubItem ? '25px' : '0')};
    font-size: 20px;
    font-weight: 400;
    border-left: 5px solid transparent;
    transition: color 0.5s, border 0.5s;
    color: #111111;
    pointer-events: ${props => (props.isAvailable ? 'auto' : 'none')};
    border-color: ${props => (props.isAvailable ? '#62A3FF' : 'transparent')};
    cursor: ${props => (props.isAvailable ? 'pointer' : 'default')};
    &:hover {
      border-color: ${props => (props.isAvailable ? '#004A9F' : 'transparent')};
      color: ${props => (props.isAvailable ? '#004A9F' : '#111111')};
    }
  }
`;
const Active = {
  borderColor: '#BA2635',
  fontWeight: 700,
  color: '#BA2635',
  cursor: 'pointer'
};
