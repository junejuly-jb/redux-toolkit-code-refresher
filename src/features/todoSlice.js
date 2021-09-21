import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    todoList: [],
    isEditing: false,
    selectedTodo: {}
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        fetchTodo: (state, action) => {
            state.todoList = action.payload
        },

        saveTodo: (state, action) => {
            state.todoList.push(action.payload)
        },

        setCheck: (state, action) => {
            state.todoList.forEach(item => {
                if (action.payload === item.id) {
                    item.done = !item.done
                }
            })
        },

        removeTodo: (state, action) => {
            state.todoList = state.todoList.filter(item => action.payload !== item.id)
        },

        setIsEditing: (state, action) => {
            state.isEditing = true
            state.selectedTodo = action.payload
        },
        setCancelEditing: (state) => {
            state.isEditing = false
            state.selectedTodo = {}
        },

        updateTodoAction: (state, action) => {
            state.todoList = state.todoList.map(todo => todo.id === state.selectedTodo.id ? { ...todo, item: action.payload } : todo)
        }
    }
});

export const { saveTodo, setCheck, removeTodo, 
    setIsEditing, setCancelEditing, updateTodoAction, fetchTodo } = todoSlice.actions

export const selectTodoList = state => state.todos.todoList
export const isEditing = state => state.todos.isEditing
export const selectedVal = state => state.todos.selectedTodo

export default todoSlice.reducer