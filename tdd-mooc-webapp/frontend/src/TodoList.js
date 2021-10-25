import React from 'react'

const TodoList = ({ todos }) => {
  return (
    <>
    {todos.map(todo => todo.text)}
    </>
  )
}

export default TodoList
