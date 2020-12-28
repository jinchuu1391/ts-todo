import React, { useEffect, useState } from "react";
import {useLocation, Link} from 'react-router-dom'
import "../style/TodoA.css";
import TodoItemComp from './TodoItemComp'

interface TodoItem {
  text: string;
  done: boolean;
}

const TodoA = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [filterdTodos, setFilteredTodos] = useState<TodoItem[]>([]);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const location = useLocation()
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
    setTodos(todos.filter(todo => todo.done === false))
    setCheckAll(false)
  }
  const onItemEdit = (index:number, textToEdit:string) => {
    const todoItems = [...todos];
    todoItems[index].text = textToEdit
    setTodos(todoItems)
  }
  const onCheckAllHandler = () => {
    setCheckAll(!checkAll)
    console.log('checkall')
  }

  useEffect(()=>{
    const pathname : string = location.pathname
    // pathname에 따라 todos를 필터링한 filteredTodos를 만든다
    // filteredTodos를 가지고 맵핑할것임
    switch (pathname) {
      case '/':
        setFilteredTodos([...todos])
        break;
      case '/active':
        setFilteredTodos(todos.filter(todo => todo.done === false));
        break;
      case '/completed':
        setFilteredTodos(todos.filter(todo => todo.done === true));
        break
      default:
        return;
    }
  },[todos, location])

  useEffect(()=>{
    if(checkAll){
      const todosToReplace = [...todos]
      todosToReplace.forEach(todo=>todo.done = true)
      setTodos(todosToReplace)
    }else{
      const todosToReplace = [...todos]
      todosToReplace.forEach(todo=>todo.done = false)
      setTodos(todosToReplace)
    }
  },[checkAll])

  return (
    <div id="TodoAContainer">
      <div id="title">Todos</div>
      <div id="content">
        <div id="todoInsert">
          <input checked={checkAll} onChange={onCheckAllHandler} type="checkbox"/>
          <input
            id="todoInput"
            placeholder='할일을 입력해보세요'
            value={inputValue}
            onChange={onInputValueChange}
            onKeyPress={onInputKeypress}
          ></input>
        </div>
        {filterdTodos.map((todo, index) => (
          <TodoItemComp key={index} text={todo.text} done={todo.done} onEdit={onItemEdit} onDeleteClick={onDeleteClick} onCheckClick={onCheckClick} index={index}></TodoItemComp>
        ))}
        <div id="todoInfo">
          <div>{todos.filter(todo=>todo.done===false).length} items left</div>
          <ul id='filters'>
            <Link className='tab' to='/'>All</Link>
            <Link className='tab' to='/active'>Active</Link>
            <Link className='tab' to='/completed'>Completed</Link>
            <li className='filter' onClick={onClearClick}>clear completed</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoA;
