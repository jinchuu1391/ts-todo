import React, { useState } from "react";
import "../style/TodoA.css";
import TodoItemComp from './TodoItemComp'

interface TodoItem {
  text: string;
  done: boolean;
}

const TodoA = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const onInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const onInputKeypress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputValue === "") {
      return;
    }

    const todo = {
      text: inputValue,
      done:false
    };
    if (event.key === "Enter") {
      setTodos([...todos, todo]);
      setInputValue("");
    }
  };
  const onDeleteClick = (index: number) => {
    return () => {
      const todoItems = [...todos];
      todoItems.splice(index, 1);
      setTodos(todoItems);
    };
  };
  const onCheckClick = (index: number) => {
    return () => {
      const todoItems = [...todos];
      todoItems[index].done = !todoItems[index].done
      setTodos(todoItems)
    }
  }
  const onClearClick = () => {

  }
  return (
    <div id="TodoAContainer">
      <div id="title">Todos</div>
      <div id="content">
        <div id="todoInsert">
          <input type="checkbox"/>
          <input
            id="todoInput"
            placeholder='할일을 입력해보세요'
            value={inputValue}
            onChange={onInputValueChange}
            onKeyPress={onInputKeypress}
          ></input>
        </div>
        {todos.map((todo, index) => (
          <TodoItemComp text={todo.text} done={todo.done} onDeleteClick={onDeleteClick} onCheckClick={onCheckClick} index={index}></TodoItemComp>
        ))}
        <div id="todoInfo">
          <div>{todos.length} items left</div>
          <ul id='filters'>
            <li className="filter">All</li>
            <li className="filter">Active</li>
            <li className="filter">Completed</li>
            <li className='filter' onClick={onClearClick}>clear completed</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoA;
