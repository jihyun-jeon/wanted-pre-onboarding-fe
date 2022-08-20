import styled from 'styled-components';
import variables from '../../styles/variables';
import { APP_API } from '../../config';

export const TodoList = styled.li`
  width: 100%;
  height: 30px;
  margin: 5px 0;
  ${variables.flex({ justify: 'start' })};
`;

export const TodoContent = styled.div`
  width: 70%;
  height: 100%;
  background-color: burlywood;
  ${variables.flex({ justify: 'start' })};

  button {
    ${variables.flex()}
    width: 20px;
    height: 20px;
    border: 2px solid gray;
    background-color: ${props => props.clearBtn};
    border-radius: 50%;
    margin-right: 10px;
  }
`;

export const TodoBtns = styled.div`
  width: 30%;
  height: 100%;
  background-color: rebeccapurple;
  ${variables.flex({ justify: 'space-around' })};

  button {
    width: 40%;
  }
`;
const TodoItem = ({ id, isCompleted, todoContent }) => {
  const getToken = localStorage.getItem('access_token');

  const deleteRequest = id => {
    fetch(`${APP_API.todo}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken}` },
    });
  };

  return (
    <TodoList key={id} id={id}>
      <TodoContent clearBtn={isCompleted ? 'green' : 'gray'}>
        <button type="button" />
        {todoContent}
      </TodoContent>
      <TodoBtns>
        <button type="button">수정</button>
        <button type="button" onClick={() => deleteRequest(id)}>
          삭제
        </button>
      </TodoBtns>
    </TodoList>
  );
};

export default TodoItem;
