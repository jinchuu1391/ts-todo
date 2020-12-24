import React, { useEffect, useState, useRef } from "react";
import "../style/TodoItemComp.css";

type TodoItemProps = {
  text: string;
  index: number;
  done:boolean;
  onDeleteClick: (index:number) => () => void;
  onCheckClick: (index:number) => () => void;
  onEdit: (index:number, textToEdit:string) => void;
};

const TodoItemComp: React.FC<TodoItemProps> = ({ text, index, done, onDeleteClick, onCheckClick, onEdit }) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [itemValue, setItemValue] = useState<string>(text);
  const inputRef = useRef<HTMLInputElement>(null)

  const onItemValueChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setItemValue(event.target.value)
  }
  const doubleClickHandler = (event:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setEditMode(!editMode)
  }
  const onInputKeypress = (event:React.KeyboardEvent<HTMLInputElement>) => {
    if(itemValue === ''){
      return;
    }
    if(event.key === 'Enter'){
      onEdit(index, itemValue)
      setItemValue('');
    }
// onEdit에 바꾸려는 text를 넣어서 실행한다
  }
  const escapeHandler = (event:React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Escape'){
      setEditMode(!editMode)
    }
  }

  useEffect(()=>{
    if(editMode){
      if(inputRef && inputRef.current){
        inputRef.current.focus()
      }
    }
  })

  return (
  <div className="todoItem" onDoubleClick={doubleClickHandler} key={index}>
      <input type="checkbox" checked={done} onChange={onCheckClick(index)} />
      {editMode?(
          <div className="todoEditContainer">
          <input
            className="todoEdit"
            placeholder='할일을 입력해보세요'
            value={itemValue}
            onChange={onItemValueChange}
            onKeyPress={onInputKeypress}
            onKeyDown={escapeHandler}
            ref={inputRef}
            onBlur={()=>setEditMode(!editMode)}
          ></input>
        </div>
      ):(
        <div onDoubleClick={doubleClickHandler} className={`todoItem__text${done ? '__checked' : ''}`}>{text}</div>
      )}
      <button onClick={onDeleteClick(index)}>X</button>
    </div>
  );
};

export default TodoItemComp;