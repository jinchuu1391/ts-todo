import React, { useState, useEffect } from "react";
import "../style/TodoItemComp.css";

type TodoItemProps = {
  text: string;
  index: number;
  done:boolean;
  onDeleteClick: (index:number) => () => void;
  onCheckClick: (index:number) => () => void;
};

const TodoItemComp: React.FC<TodoItemProps> = ({ text, index, done, onDeleteClick, onCheckClick }) => {

  // isChecked 가 true 면 text에 삭선한다
  const [isChecked, setIsChecked] = useState<boolean>(false)
  useEffect(()=> {
    console.log(done)
  },[])

  return (
    <div className="todoItem" key={index}>
      <input type="checkbox" onChange={onCheckClick(index)} />
      {done ? (
        <div className="todoItem__text__checked">{text}</div>
      ):(
      <div className="todoItem__text">{text}</div>
      )}
      <button onClick={onDeleteClick(index)}>X</button>
    </div>
  );
};

export default TodoItemComp;
