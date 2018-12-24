import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Pallete from '../../colors';

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

const Aside = styled.div`
  width: 100%;
`;
const Menu = styled.ul`
  box-sizing: border-box;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;
const Li = styled.li`
  box-sizing: border-box;
  padding-top: 10px;
  padding-bottom: 13px;
  padding-left: 10px;
  font-size: 18px;
  font-weight: 400;
  color: ${Pallete.white};
  font-family: 'Playfair Display', sans-serif;
  cursor: 'default';
`;
const Link = styled.div`
  & a {
    display: block;
    box-sizing: border-box;
    text-decoration: none;
    padding-top: 12px;
    padding-bottom: 11px;
    padding-left: ${props => (props.isSubItem ? '25px' : '10px')};
    margin-left: 0;
    font-size: 18px;
    font-weight: 400;
    font-family: 'Playfair Display', sans-serif;
    background-color: ${props =>
      props.isAvailable ? Pallete.green : 'transparent'};
    color: ${Pallete.white};
    transition: color 0.5s, border 0.5s, background-color 0.5s;
    pointer-events: ${props => (props.isAvailable ? 'auto' : 'none')};
    cursor: ${props => (props.isAvailable ? 'pointer' : 'default')};
    &:hover {
      background-color: ${props =>
        props.isAvailable ? Pallete.white : 'transparent'};
      color: ${props => (props.isAvailable ? Pallete.darkBlue : Pallete.white)};
    }
  }
`;
const Active = {
  backgroundColor: Pallete.red,
  color: Pallete.white,
  cursor: 'pointer'
};
