import { useState } from 'react'
import apiClient from './apiClient'

const useAddTodo = () => {
  const [response, setResponse] = useState(undefined)

  const addTodo = async (todo) => {
    const { data } = await apiClient.post('/api/todos', todo)
    setResponse(data)
  }

  return [response, addTodo]
}

export default useAddTodo