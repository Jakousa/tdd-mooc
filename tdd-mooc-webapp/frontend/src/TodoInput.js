import React, { useState } from 'react'
import useAddTodo from './useAddTodo';

const TodoInput = () => {
  const [_, addTodo] = useAddTodo()
  const [inputValue, setInputValue] = useState('')

  const addNewTodo = async () => {
    const todo = { text: inputValue }
    addTodo(todo)
  }

  return (
    <>
      <input aria-label="todo-input" value={inputValue} onChange={({target}) => { setInputValue(target.value) }} />
      <button aria-label="todo-send-button" onClick={addNewTodo}> Add todo </button>
    </>
  )
}

export default TodoInput
