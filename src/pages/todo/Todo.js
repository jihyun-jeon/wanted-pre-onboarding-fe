import * as S from './TodoStyles';
import { useState, useEffect } from 'react';
import { APP_API } from '../../config';
import TodoItem from './TodoItem';

const Todo = () => {
  const [todoData, setTodoData] = useState([]);
  const [todoText, setTodoText] = useState('');
  const getToken = localStorage.getItem('access_token');

  useEffect(() => {
    fetch(`${APP_API.todo}`, {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setTodoData(result);
      });
  }, []);

  const todoPost = () => {
    console.log('post', todoText);

    fetch(`${APP_API.todo}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        todo: todoText,
      }),
    })
      .then(res => res.json())
      .then(result => console.log(result));
    setTodoText('');
  };

  return (
    <S.TodoWrapper>
      <S.TodoTop>
        <input
          type="text"
          value={todoText}
          onChange={e => setTodoText(e.target.value)}
        />
        <button type="button" onClick={todoPost}>
          add
        </button>
      </S.TodoTop>
      <S.TodoBody>
        {todoData.map(data => (
          <TodoItem
            key={data.id}
            id={data.id}
            isCompleted={data.isCompleted}
            todoContent={data.todo}
          />
        ))}
      </S.TodoBody>
    </S.TodoWrapper>
  );
};

export default Todo;
