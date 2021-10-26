import React from 'react'
import TodoList from './TodoList'
import useGetTodos from './useGetTodos'

const App = () => {
  const todos = useGetTodos()
  return (
    <>
      <TodoList todos={todos} />
      Hello from frontend
    </>
  )
}

export default App