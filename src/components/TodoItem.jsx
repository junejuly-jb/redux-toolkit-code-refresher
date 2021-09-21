import React from 'react'
import './TodoItem.css'
import Checkbox from '@material-ui/core/Checkbox'
import { useDispatch } from 'react-redux'
import { setCheck, removeTodo, setIsEditing } from '../features/todoSlice'
import axios from 'axios'

const TodoItem = ({ todo }) => {
    const dispatch = useDispatch()
    const handleCheck = () => {
        axios.put('http://localhost:5000/tasks/' + todo.id, { done: !todo.done, item: todo.item })
            .then(() => {
                dispatch(setCheck(todo.id))
            })
    }

    const onClickDelete = () => {
        axios.delete('http://localhost:5000/tasks/' + todo.id)
            .then(() => {
                dispatch(removeTodo(todo.id))
            })
    }

    const editTodo = () => {
        dispatch(setIsEditing({ id: todo.id, item: todo.item, done: todo.done }))
    }

    return (
        <div className='todoItem'>
            <Checkbox
                checked={todo.done}
                color="primary"
                onChange={handleCheck}
                inputProps={{'aria-label' : 'secondary checkbox'}}
            />
            <p onClick={editTodo} className={todo.done ? 'todoItem--done' : ''}>{todo.item}</p>
            
            <button onClick={onClickDelete}>Delete</button>
        </div>
    )
}

export default TodoItem
