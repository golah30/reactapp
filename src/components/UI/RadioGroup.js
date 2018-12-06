import React from 'react';
import styled from 'styled-components';
import AnimateHeight from 'react-animate-height';
import _ from 'lodash';

class RadioGroup extends React.PureComponent {
  state = {
    type: 'insert',
    insert: 'manual',
    relative: 'max'
  };
  componentDidMount() {
    this.setStateFromProps();
  }
  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.value, prevProps.value)) {
      this.setStateFromProps();
    }
  }
  setStateFromProps = () => {
    const { value, change } = this.props;
    if (value && value.type) {
      this.setState(
        { type: value.type, insert: value.insert, relative: value.relative },
        () => {
          if (change)
            change({
              type: this.state.type,
              insert: this.state.insert,
              relative: this.state.relative
            });
        }
      );
    } else {
      if (change)
        change({
          type: this.state.type,
          insert: this.state.insert,
          relative: this.state.relative
        });
    }
  };
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
        <Group>
          <Radio
            sub={false}
            name="type"
            value="relative"
            checked={this.state.type === 'relative'}
            label={'Используя шкалу отношений'}
            change={this.handleChange}
          />
          <AnimateHeight
            duration={500}
            height={this.state.type === 'relative' ? 'auto' : 0}
          >
            <Group sub>
              <Radio
                sub={true}
                name="relative"
                value="max"
                checked={this.state.relative === 'max'}
                label={'Чем больше, тем лучше'}
                change={this.handleChange}
              />
              <Radio
                sub={true}
                name="relative"
                value="min"
                checked={this.state.relative === 'min'}
                label={'Чем меньше, тем лучше'}
                change={this.handleChange}
              />
            </Group>
          </AnimateHeight>
        </Group>
      </Container>
    );
  }
  handleChange = (name, value) => {
    this.setState({ [name]: value }, () => {
      this.props.change({
        type: this.state.type,
        insert: this.state.insert,
        relative: this.state.relative
      });
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
  margin-bottom: ${props => (props.sub ? '0' : '10px')};
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
