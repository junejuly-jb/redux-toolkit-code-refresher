import React, { useEffect, useState } from 'react';
import './App.css';
import Input from './components/Input';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodoList, fetchTodo } from './features/todoSlice'
import TodoItem from './components/TodoItem';
import axios from 'axios'

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(res => {
        dispatch(fetchTodo(res.data))
    })
  }, [dispatch])
  const classes = useStyles();
  const todos = useSelector(selectTodoList)
  const [mode, setMode] = useState('none')
  var renderList

  const handleChange = (e) => {
    setMode(e.target.value)
  }
  
  if (mode === 'none') {
    renderList = todos.map((todo) => (<TodoItem todo={todo} key={todo.id} />))
  }
  else if(mode === 'completed') {
    const result = todos.filter((todo) => todo.done === true)
    renderList = result.map(todo => (<TodoItem todo={todo} key={todo.id} />))
  }
  else {
    const result = todos.filter((todo) => todo.done === false)
    renderList = result.map(todo => (<TodoItem todo={todo} key={todo.id} />))
  }

  return (
    <div className="App">
      <div className="app__container">
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Filter by</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={mode}
              onChange={handleChange}
            >
              <MenuItem value='none'>None</MenuItem>
              <MenuItem value='completed'>Completed</MenuItem>
              <MenuItem value='incomplete'>Not completed</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="app_todoContainer">
          {renderList}
        </div>
        <Input />
      </div>
      
    </div>
  );
}

export default App;
