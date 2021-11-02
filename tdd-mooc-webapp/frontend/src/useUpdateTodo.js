import { useState } from 'react'
import apiClient from './apiClient'

const useUpdateTodo = (todo) => {
  const [response, setResponse] = useState(todo)

  const updateTodo = async (id, newTodo) => {
    const { data } = await apiClient.put(`/api/todos/${id}`, newTodo)

    setResponse(data)
  }

  return [response, updateTodo]
}

export default useUpdateTodo