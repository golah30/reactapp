import React from 'react';
import styled from 'styled-components';

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
        <Title>
          {title}
          <TitleI
            className="fa fa-plus"
            onClick={this.addItem}
            aria-hidden="true"
          />
        </Title>
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
    const { title, value, id } = this.props;
    return (
      <ItemContainer>
        <ItemTitle>{`${title}${id + 1}`}</ItemTitle>
        <ItemInput
          type="text"
          name={title}
          value={value ? value : ''}
          onChange={this.handleChange}
        />
        <ItemButton onClick={this.handleClick}>
          <ItemI className="fa fa-plus" aria-hidden="true" />
        </ItemButton>
      </ItemContainer>
    );
  }
}
const ItemI = styled.i`
  transform: rotate(45deg);
  color: #f25c5f;
  font-size: 20px;
  transition: color 0.5s;
  cursor: pointer;
  &:hover {
    color: #ba2635;
  }
`;
const TitleI = styled.i`
  color: #62a3ff;
  font-size: 20px;
  float: right;
  transition: color 0.5s;
  margin-right: 2px;
  cursor: pointer;
  &:hover {
    color: #004a9f;
  }
`;
const Data = styled.div`
  color: #111111;
  width: 230px;
`;
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const Title = styled.h3`
  margin: 0;
  margin-bottom: 9px;
  font-size: 20px;
  padding-left: 35px;
  font-weight: normal;
`;
const ItemContainer = styled.li`
  margin-bottom: 25px;
  width: 100%;
`;
const ItemTitle = styled.span`
  display: inline-block;
  width: 15%;
  font-size: 18px;
`;
const ItemInput = styled.input`
  border: none;
  outline: none;
  border-bottom: 1px solid #677db7;
  font-size: 16px;
  width: 70%;
`;
const ItemButton = styled.div`
  display: inline-block;
  text-align: right;
  width: 10%;
`;
