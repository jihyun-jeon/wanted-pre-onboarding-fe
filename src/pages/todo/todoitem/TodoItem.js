import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import variables from '../../../styles/variables';
import { APP_API } from '../../../config';
import { observer } from 'mobx-react';
import { storeTodoData } from '../../../store/todoData';
import * as S from './TodoItemStyles';

//
const TodoItem = observer(({ id, isCompleted, todoContent }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isClear, setIsClear] = useState(isCompleted);
  const [editText, setEditText] = useState('');
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

  const editRequest = async editContent => {
    const postText = editContent || todoContent;

    await fetch(`${APP_API.todo}/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        todo: postText,
        isCompleted: isClear,
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
  };

  return (
    <S.TodoList key={id} id={id}>
      {!isEditMode && (
        <S.TodoContent isClear={isClear}>
          <S.ClearCheckBtn
            onClick={() => {
              setIsClear(prev => !prev);
              editRequest();
            }}
            isClear={isClear}
          />
          {todoContent}
        </S.TodoContent>
      )}

      {/* 수정모드 */}
      {isEditMode && <S.TodoEdit onChange={e => setEditText(e.target.value)} />}

      {!isEditMode && (
        <S.TodoControlBtns>
          <button type="button" onClick={() => setIsEditMode(prev => !prev)}>
            수정
          </button>
          <button type="button" onClick={deleteRequest}>
            삭제
          </button>
        </S.TodoControlBtns>
      )}

      {/* 수정모드 */}
      {isEditMode && (
        <S.TodoControlBtns>
          <button
            type="button"
            onClick={() => {
              editRequest(editText);
              setIsEditMode(prev => !prev);
            }}
          >
            제출
          </button>
          <button type="button" onClick={() => setIsEditMode(prev => !prev)}>
            취소
          </button>
        </S.TodoControlBtns>
      )}
    </S.TodoList>
  );
});

export default TodoItem;
