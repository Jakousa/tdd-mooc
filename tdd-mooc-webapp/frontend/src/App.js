import React from 'react'
import TodoList from './TodoList'
import TodoInput from './TodoInput'
import useGetTodos from './useGetTodos'

const App = () => {
  const todos = useGetTodos()
  return (
    <>
      <TodoInput />
      <TodoList todos={todos} />
      Hello from frontend
    </>
  )
}

export default App