import styled from 'styled-components';
import Pallete from '../../../colors';

export const Table = styled.table`
  border-collapse: collapse;
  margin-bottom: 30px;
  border-radius: 2px;
  overflow: hidden;
`;
export const Body = styled.tbody``;
export const Row = styled.tr``;
export const TitleCell = styled.td`
  padding: 5px;
  border: 1px solid ${Pallete.blue};
  color: ${props => (props.white ? '#111111' : Pallete.white)};
  text-align: center;
  background-color: ${props =>
    props.white ? 'transparent' : Pallete.lightBlue};
`;
export const CellContainer = styled.td`
  border: 1px solid ${Pallete.blue};
  text-align: center;
  background-color: ${props => (props.gray ? Pallete.gray : 'transparent')};
  & input {
    background-color: ${props => (props.gray ? Pallete.gray : 'transparent')};
  }
`;
export const CellInput = styled.input`
  box-sizing: border-box;
  border: none;
  width: 60px;
  padding: 5px;
  color: #111111;
  text-align: center;
  &:focus {
    outline: none;
  }
`;
