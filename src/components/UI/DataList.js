import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import CloseIcon from './Icons/CloseIcon';
import Pallete from '../../colors';

export default class DataList extends React.PureComponent {
  state = {
    items: []
  };
  componentDidMount() {
    if (this.props.value.length > 0) {
      this.setState({ items: [...this.props.value] });
    } else {
      let items = [];
      for (let i = 0; i < this.props.defaultCount; i++) items.push('');
      this.setState({ items: items });
    }
  }
  addItem = () => {
    let items = [...this.state.items];
    items.push('');
    this.props.change(this.props.name, items);
    this.setState({ items: items });
  };
  removeItem = id => {
    let items = [...this.state.items];
    items.splice(id, 1);
    this.props.change(this.props.name, items);
    this.setState({ items: items });
  };
  handleItemChange = (id, value) => {
    let items = [...this.state.items];
    items[id] = value;
    this.props.change(this.props.name, items);
    this.setState({ items: items });
  };
  render() {
    const { title, itemTitle } = this.props;
    return (
      <Data>
        <Title>{title}</Title>
        <List>
          {this.state.items.map((item, key) => (
            <Item
              id={key}
              key={key}
              title={itemTitle}
              value={item}
              change={this.handleItemChange}
              click={this.removeItem}
            />
          ))}
        </List>
        <Button
          click={this.addItem}
          title="Добавить"
          disabled={!(this.state.items.length < 10)}
        />
      </Data>
    );
  }
}

class Item extends React.PureComponent {
  handleChange = e => {
    const { change, id } = this.props;
    if (change) change(id, e.target.value);
  };
  handleClick = () => {
    const { click, id } = this.props;
    if (click) click(id);
  };
  render() {
    const { title, value } = this.props;
    return (
      <ItemContainer>
        <InputContainer>
          <ItemInput
            type="text"
            name={title}
            value={value ? value : ''}
            onChange={this.handleChange}
          />
        </InputContainer>
        <ItemButton onClick={this.handleClick}>
          <CloseIcon width="20" height="20" stroke="#c5283d" />
        </ItemButton>
      </ItemContainer>
    );
  }
}
const ItemContainer = styled.li`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  border: 2px solid ${Pallete.blue};
  width: 100%;
  height: 40px;
  overflow: hidden;
  border-radius: 3px;
`;
const InputContainer = styled.div`
  height: 100%;
`;
const ItemInput = styled.input`
  box-sizing: border-box;
  border: none;
  outline: none;
  padding: 5px 10px;
  height: 100%;
  width: 180px;
  font-size: 16px;
`;
const ItemButton = styled.div`
  box-sizing: border-box;
  position: relative;
  display: block;
  width: 40px;
  height: 100%;
  border-left: 2px solid ${Pallete.blue};
  background-color: transparent;
  transition: background-color 0.3s;
  cursor: pointer;
  & svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    stroke: ${Pallete.blue};
    transition: stroke 0.5s;
  }
  &:hover {
    background-color: ${Pallete.blue};
    & svg {
      stroke: ${Pallete.white};
    }
  }
`;
const Data = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #111111;
  width: 230px;
`;
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 230px;
`;
const Title = styled.div`
  margin: 0;
  margin-bottom: 9px;
  font-size: 20px;
  font-weight: normal;
`;
