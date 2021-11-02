import React from 'react'
import useUpdateTodo from './useUpdateTodo'

const Todo = ({ todo: propTodo }) => {
  const [todo, updateTodo] = useUpdateTodo(propTodo)

  const markTodoAsCompleted = () => {
    updateTodo(todo.id, { completed: true })
  }

  return (
    <>
      {todo.text}
      {todo.completed ?
      "Completed"
      : <button onClick={markTodoAsCompleted} aria-label="todo-completed-button">Mark as completed</button>
      }
    </>
  )
}

export default Todo
