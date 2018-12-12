import styled from 'styled-components';

export const Table = styled.table`
  border-collapse: collapse;
  margin-bottom: 30px;
`;
export const Body = styled.tbody``;
export const Row = styled.tr``;
export const TitleCell = styled.td`
  padding: 5px;
  border: 1px solid #348ce8;
  text-align: center;
  background-color: ${props => (props.white ? 'transparent' : '#62a3ff')};
`;
export const CellContainer = styled.td`
  border: 1px solid #348ce8;
  text-align: center;
  background-color: ${props => (props.gray ? '#d3d3d3' : 'transparent')};
  & input {
    background-color: ${props => (props.gray ? '#d3d3d3' : 'transparent')};
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
