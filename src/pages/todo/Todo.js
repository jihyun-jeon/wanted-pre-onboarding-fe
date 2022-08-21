import { observer } from 'mobx-react';

import * as S from './TodoStyles';
import { useState, useEffect } from 'react';
import { APP_API } from '../../config';
import TodoItem from './todoitem/TodoItem';
import { storeTodoData } from '../../store/todoData';
import { useNavigate, useLocation } from 'react-router-dom';

const Todo = observer(() => {
  const [todoText, setTodoText] = useState('');
  const getToken = localStorage.getItem('access_token');
  console.log(getToken);

  const location = useLocation().pathname;
  const navigate = useNavigate();

  const { todoArr } = storeTodoData;
  // console.log(toJS(todoArr));

  useEffect(() => {
    if (!getToken && location === '/todo') {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (!getToken) {
      // [문제] 1.getToken 이 처음에 null임 -> 2. 그 상태에서 get요청해서 오류남 -> 3. 이후 getToken값이 제대로 생김
      return;
    }
    fetch(`${APP_API.todo}`, {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    })
      .then(res => res.json())
      .then(result => {
        console.log('result', result);
        storeTodoData.setTodoArr(result);
      });
  }, [getToken]);

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
        {todoArr?.map(data => (
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
