import { observer } from 'mobx-react';

import * as S from './TodoStyles';
import { useState, useEffect } from 'react';
import { APP_API } from '../../config';
import TodoItem from './todoitem/TodoItem';
import { storeTodoData } from '../../store/todoData';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionsCreator } from '../../store/todoData';

const Todo = observer(() => {
  const [todoText, setTodoText] = useState('');
  const getToken = localStorage.getItem('access_token');

  const location = useLocation().pathname;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // const { todoArr } = storeTodoData; // ✅
  const todoArr = useSelector(state => state);

  useEffect(() => {
    if (!getToken && location === '/todo') {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (!getToken) {
      return;
    }
    fetch(`${APP_API.todo}`, {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    })
      .then(res => res.json())
      .then(result => {
        // storeTodoData.setTodoArr(result); // ✅
        dispatch(actionsCreator.d_setTodoArr(result));
      });
  }, [getToken]);

  const todoPost = async () => {
    const res = await fetch(`${APP_API.todo}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        todo: todoText,
      }),
    });

    const result = await res.json();

    // storeTodoData.addTodo(result); // ✅
    dispatch(actionsCreator.d_addTodo(result));
    setTodoText('');
  };

  return (
    <>
      <h1>Todo List</h1>
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
    </>
  );
});

export default Todo;
