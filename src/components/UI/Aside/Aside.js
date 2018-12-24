import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';
import Pallete from '../../../colors';
import LeftArrow from '../Icons/LeftArrow';
import Bars from '../Icons/Bars';

export default class Aside extends PureComponent {
  state = {
    mode: 0
  };
  render() {
    const { subTitle } = this.props;
    return (
      <Fragment>
        {this.state.mode === 0 ? (
          <Fragment>
            <AsideTitle>
              <AsideOpen onClick={this.handleOpen}>
                <Bars width="20" height="20" />
              </AsideOpen>
              <TitleMain>Nootron</TitleMain>
              <TitleSub>{subTitle}</TitleSub>
            </AsideTitle>
          </Fragment>
        ) : null}
        {this.state.mode === 1 ? (
          <Fragment>
            <AsideContainer>
              <Header>
                <HeaderTitle>Nootron</HeaderTitle>
                <HeaderSubTitle>{subTitle}</HeaderSubTitle>
              </Header>
              {this.props.children}
            </AsideContainer>
            <CloseAside onClick={this.handleClose}>
              <LeftArrow width="35" height="20" />
            </CloseAside>
          </Fragment>
        ) : null}
      </Fragment>
    );
  }
  handleClose = () => {
    this.setState({ mode: 0 }, () => {
      this.props.handleAsideMode(0);
    });
  };
  handleOpen = () => {
    this.setState({ mode: 1 }, () => {
      this.props.handleAsideMode(300);
    });
  };
}
const AsideTitle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
`;
const TitleMain = styled.div`
  box-sizing: border-box;
  padding: 0 8px;
  color: ${Pallete.white};
  font-size: 18px;
  border-right: 1px solid ${Pallete.white};
`;
const TitleSub = styled.div`
  color: ${Pallete.white};
  font-size: 16px;
  padding-left: 8px;
`;
const AsideOpen = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  cursor: pointer;
  &:hover svg {
    stroke: ${Pallete.hoverRed};
  }
  & svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: stroke 0.5s;
    stroke: ${Pallete.white};
  }
`;
const CloseAside = styled.div`
  position: absolute;
  top: 0;
  left: 300px;
  width: 45px;
  height: 30px;
  cursor: pointer;
  &:hover svg {
    stroke: ${Pallete.hoverRed};
  }
  & svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: stroke 0.5s;
    stroke: ${Pallete.white};
  }
`;

const Header = styled.div`
  font-family: 'Playfair Display', sans-serif;
  color: ${Pallete.white};
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;
const HeaderTitle = styled.div`
  padding: 5px 25px;
  font-size: 26px;
  display: inline-block;
  text-align: center;
  border-bottom: 1px solid ${Pallete.blanchedWhite};
`;
const HeaderSubTitle = styled.div`
  font-size: 22px;
  display: inline-block;
  text-align: center;
`;

const AsideContainer = styled.div`
  background-color: ${Pallete.darkBlue};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 300px;
  height: 100%;
`;
