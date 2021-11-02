import { useState } from 'react'
import apiClient from './apiClient'

const useUpdateTodo = () => {
  const [response, setResponse] = useState(undefined)

  const updateTodo = async (id, newTodo) => {
    const { data } = await apiClient.put(`/api/todos/${id}`, newTodo)

    setResponse(data)
  }

  return [response, updateTodo]
}

export default useUpdateTodo