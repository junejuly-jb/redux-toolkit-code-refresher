import React, { useState, useEffect } from 'react'
import './Input.css'
import axios from 'axios'

//redux
import {useDispatch, useSelector} from 'react-redux'
import { saveTodo, isEditing, setCancelEditing, selectedVal, updateTodoAction } from '../features/todoSlice'

const Input = () => {
    const dispatch = useDispatch()
    const editState = useSelector(isEditing)
    const selectedTodo = useSelector(selectedVal)
    const [input, setInput] = useState('')

    useEffect(() => {
        if (editState) {
            setInput(selectedTodo.item)
        }
    }, [editState, selectedTodo.item])

    const addTodo = (e) => {
        e.preventDefault()
        const newTodo = {
            item: input,
            done: false,
            id: Date.now()
        }
        axios.post('http://localhost:5000/tasks', newTodo)
            .then(() => {
                dispatch(saveTodo(newTodo))
                setInput('')
            })
    }

    const btnCancel = () => {
        dispatch(setCancelEditing())
        setInput('')
    }

    const updateTodo = () => {
        axios.put('http://localhost:5000/tasks/' + selectedTodo.id, {
            item: input,
            done: selectedTodo.done
        })
        .then(() => {
            dispatch(updateTodoAction(input))
            dispatch(setCancelEditing())
            setInput('')
        }) 
    }

    return (
        <div className="input">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value) }
            />
            {!editState ? <button onClick={addTodo}>Add</button> : <div><button onClick={btnCancel}>Cancel</button><button onClick={updateTodo}>Update</button></div>}
        </div>
    )
}

export default Input
