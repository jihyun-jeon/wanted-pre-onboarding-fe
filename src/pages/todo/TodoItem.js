import styled from 'styled-components';
import variables from '../../styles/variables';
import { APP_API } from '../../config';
import { observer } from 'mobx-react';
import { storeTodoData } from '../../store/todoData';

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
  text-decoration: ${props => props.isCompleted && 'line-through'};
  ${variables.flex({ justify: 'start' })};

  button {
    ${variables.flex()}
    width: 20px;
    height: 20px;
    border: 2px solid gray;
    background-color: ${props => (props.isCompleted ? 'green' : 'gray')};
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
//
const TodoItem = ({ id, isCompleted, todoContent }) => {
  const { todoArr } = storeTodoData;
  const getToken = localStorage.getItem('access_token');

  const deleteRequest = async () => {
    await fetch(`${APP_API.todo}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken}` },
    });

    await fetch(`${APP_API.todo}`, {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    })
      .then(res => res.json())
      .then(result => {
        storeTodoData.setTodoArr(result);
      });
  };

  const editRequest = async () => {
    await fetch(`${APP_API.todo}/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        todo: todoContent,
        isCompleted: !isCompleted,
      }),
    })
      .then(res => res.json())
      .then(result => {
        const updatedArr = todoArr.map(data => {
          if (data.id === result.id) {
            return result;
          }

          return data;
        });

        storeTodoData.setTodoArr(updatedArr);
      });

    // await fetch(`${APP_API.todo}`, {
    //   headers: {
    //     Authorization: `Bearer ${getToken}`,
    //   },
    // })
    //   .then(res => res.json())
    //   .then(result => {
    //     console.log(result);
    //     // storeTodoData.setTodoArr(result);
    //   });
  };

  return (
    <TodoList key={id} id={id}>
      <TodoContent isCompleted={isCompleted}>
        <button type="button" onClick={editRequest} />
        {todoContent}
      </TodoContent>
      <TodoBtns>
        <button type="button">수정</button>
        <button type="button" onClick={deleteRequest}>
          삭제
        </button>
      </TodoBtns>
    </TodoList>
  );
};

export default TodoItem;
