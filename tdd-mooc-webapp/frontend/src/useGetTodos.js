import { useEffect, useState } from 'react'
import apiClient from './apiClient'

const useGetTodos = () => {
  const [todos, setTodos] = useState([])

  const getTodos = async () => {
    const { data } = await apiClient.get('/api/todos')
    setTodos(data)
  }

  useEffect(() => {
    getTodos()
  }, [])

  return todos
}

export default useGetTodos