import React, { useEffect, useRef, useState } from 'react';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import {Todo} from "../Component/model"
import { MdDone } from "react-icons/md";
import './styles.css'
import TodoList from './TodoList';
type Props={
    todo:Todo;
    todos:Todo[];
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
}
const SingleTodo:React.FC<Props>=({todo,todos,setTodos}:Props)=>{
    const [edit,setEdit]=useState<boolean>(false);
    const [editTodo,setEditTodo]=useState<string>(todo.todo);
    const inputRef=useRef<HTMLInputElement>(null);

    const handleDone=(id:number)=>{
        setTodos(todos.map(todo=>todo.id===id?{...todo,isDone:!todo.isDone}:todo))
    };
    const handleDelete=(id:number)=>{
        setTodos(todos.filter((todo)=>todo.id!==id));
    };
    const handleEdit=(id:number)=>{
        if(!edit && !todo.isDone)
        {
            setEdit(!edit);
        }
    };
    const handleFormSubmit=(e: React.FormEvent<HTMLFormElement>, id: number)=>{
        e.preventDefault();
        setTodos(todos.map((todo)=>(
            todo.id===id?{...todo,todo:editTodo}:todo
        )))
        setEdit(false);
    }
    useEffect(()=>{
        inputRef.current?.focus();
    },[edit])
    return <form className="todos__single" onSubmit={(e)=>handleFormSubmit(e,todo.id)}>
        {edit?<input value={editTodo} onChange={(e)=>setEditTodo(e.target.value)} className='todos__single--text' ref={inputRef}/>:
           todo.isDone?(<s className="todos__single--text">
            {todo.todo}
        </s>):<span className="todos__single--text">
            {todo.todo}
        </span>
        }
        
        
        <div>
            <span className="icon" onClick={()=>handleEdit(todo.id)}><AiFillEdit/></span>
            <span className="icon" onClick={()=>handleDelete(todo.id)}><AiFillDelete/></span>
            <span className="icon" onClick={()=>handleDone(todo.id)}><MdDone/></span>
        </div>
    </form>
}
export default SingleTodo;