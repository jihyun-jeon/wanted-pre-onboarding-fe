import { observer } from 'mobx-react';

import * as S from './TodoStyles';
import { useState, useEffect } from 'react';
import { APP_API } from '../../config';
import TodoItem from './TodoItem';
import { storeTodoData } from '../../store/todoData';
import { toJS } from 'mobx';

const Todo = observer(() => {
  const [todoText, setTodoText] = useState('');
  const getToken = localStorage.getItem('access_token');

  const { todoArr } = storeTodoData;
  console.log(toJS(todoArr));

  useEffect(() => {
    fetch(`${APP_API.todo}`, {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    })
      .then(res => res.json())
      .then(result => {
        storeTodoData.setTodoArr(result);
      });
  }, []);

  const todoPost = async () => {
    await fetch(`${APP_API.todo}`, {
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
      .then(result => setTodoText(''));

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
        {todoArr.map(data => (
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
});

export default Todo;
