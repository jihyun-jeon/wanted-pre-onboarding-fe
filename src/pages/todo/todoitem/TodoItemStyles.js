import styled from 'styled-components';
import variables from '../../../styles/variables';

export const TodoList = styled.li`
  width: 100%;
  height: 30px;
  margin: 5px 0;
  ${variables.flex({ justify: 'start' })};
`;

export const ClearCheckBtn = styled.button.attrs({ type: 'button' })`
  ${variables.flex()}
  width: 20px;
  height: 20px;
  border: 2px solid gray;
  background-color: ${props => (props.isClear ? 'green' : 'gray')};
  border-radius: 50%;
  margin-right: 10px;
`;

export const TodoContent = styled.div`
  width: 70%;
  height: 100%;
  background-color: burlywood;
  text-decoration: ${props => props.isClear && 'line-through'};
  ${variables.flex({ justify: 'start' })};
`;

export const TodoEdit = styled.input`
  width: 70%;
  height: 100%;
  background-color: burlywood;
  ${variables.flex({ justify: 'start' })};
`;

export const TodoControlBtns = styled.div`
  width: 30%;
  height: 100%;
  background-color: rebeccapurple;
  ${variables.flex({ justify: 'space-around' })};

  button {
    width: 40%;
  }
`;
