import React from 'react';
import styled from 'styled-components';
import AnimateHeight from 'react-animate-height';

class RadioGroup extends React.PureComponent {
  state = {
    type: 'insert',
    insert: 'manual'
  };
  componentDidMount() {
    const { value, change } = this.props;
    if (value && value.type) {
      this.setState({ type: value.type, insert: value.insert }, () => {
        if (change)
          change({ type: this.state.type, insert: this.state.insert });
      });
    }
    if (change) change({ type: this.state.type, insert: this.state.insert });
  }
  render() {
    return (
      <Container>
        <Group>
          <Radio
            sub={false}
            name="type"
            value="insert"
            checked={this.state.type === 'insert'}
            label={'Заполнить матрицу парных сравнений'}
            change={this.handleChange}
          />
          <AnimateHeight
            duration={500}
            height={this.state.type === 'insert' ? 'auto' : 0}
          >
            <Group sub>
              <Radio
                sub={true}
                name="insert"
                value="manual"
                checked={this.state.insert === 'manual'}
                label={'Вручную'}
                change={this.handleChange}
              />
              <Radio
                sub={true}
                name="insert"
                value="auto"
                checked={this.state.insert === 'auto'}
                label={'Автоматически'}
                change={this.handleChange}
              />
            </Group>
          </AnimateHeight>
        </Group>
        <Group>
          <Radio
            sub={false}
            name="type"
            value="compare"
            checked={this.state.type === 'compare'}
            label={'Сравнить с образцом'}
            change={this.handleChange}
          />
        </Group>
      </Container>
    );
  }
  handleChange = (name, value) => {
    this.setState({ [name]: value }, () => {
      this.props.change({ type: this.state.type, insert: this.state.insert });
    });
  };
}
class Radio extends React.PureComponent {
  render() {
    const { name, value, label, checked, sub } = this.props;
    return (
      <RadioWrap sub={sub}>
        <Label>
          <I checked={checked} className="fa fa-circle" />
          <I checked={!checked} className="fa fa-circle-o" />
          {label}
          <Input
            type="radio"
            name={name}
            value={value}
            checked={checked}
            onChange={this.handleChange}
          />
        </Label>
      </RadioWrap>
    );
  }
  handleChange = e => {
    this.props.change(e.target.name, e.target.value);
  };
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Group = styled.div`
  padding-left: ${props => (props.sub ? '20px' : '0')};
`;
const RadioWrap = styled.div`
  position: relative;
  padding-top: ${props => (props.sub ? '8px' : '0')};
`;
const Label = styled.label`
  position: relative;
  font-weight: 300;
  font-size: 16px;
  margin-right: 30px;
  padding-left: 24px;
`;
const Input = styled.input`
  position: absolute;
  left: -999999px;
`;
const I = styled.i`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0%, -50%);
  font-size: 16px;
  color: #f15c61;
  transition: opacity 0.3s, color 0.5s;
  z-index: 1;
  opacity: ${props => (props.checked ? '1' : '0')};
  &:hover {
    color: #ba2635;
  }
`;
export default RadioGroup;
