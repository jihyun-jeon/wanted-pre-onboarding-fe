import { observable } from 'mobx';

export const storeTodoData = observable({
  todoArr: [],

  setTodoArr(updatedArr) {
    this.todoArr = updatedArr;
  },
});
