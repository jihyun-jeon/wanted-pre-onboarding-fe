/*
import { observable } from 'mobx';

export const storeTodoData = observable({
  todoArr: [],

  setTodoArr(updatedArr) {
    this.todoArr = updatedArr;
  },

  addTodo(newTodo) {
    this.todoArr.push(newTodo);
  },

  deleteTodo(id) {
    this.todoArr = this.todoArr.filter(data => data.id !== id);
  },

  editTodo(editedObj) {
    const updatedArr = this.todoArr.map(data => {
      if (data.id === editedObj.id) {
        return editedObj;
      }

      return data;
    });

    this.todoArr = updatedArr;
  },
});
*/

import { createStore } from 'redux';

const setTodoArr = 'setTodoArr';
const addTodo = 'addTodo';
const deleteTodo = 'deleteTodo';
const editTodo = 'editTodo';

const d_setTodoArr = todo => {
  return { type: setTodoArr, content: todo };
};

const d_addTodo = todo => {
  return { type: addTodo, content: todo };
};

const d_deleteTodo = id => {
  return { type: deleteTodo, id: id };
};

const d_editTodo = todoObj => {
  return { type: editTodo, content: todoObj };
};

export const actionsCreator = {
  d_setTodoArr,
  d_addTodo,
  d_deleteTodo,
  d_editTodo,
};

// action = {type : deleteTodo등 , content:[] , id : id}
const reducer = (
  todoArr = [
    {
      id: 1,
      todo: 'todo2',
      isCompleted: false,
      userId: 1,
    },
  ],
  action
) => {
  switch (action.type) {
    case setTodoArr:
      return [...action.content];

    case addTodo:
      return [...todoArr, action.content];

    case deleteTodo:
      return todoArr.filter(todo => todo.id !== action.id);

    case editTodo:
      return todoArr.map(data => {
        if (data.id === action.content.id) {
          return action.content;
        }

        return data;
      });

    default:
      return todoArr;
  }
};

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
