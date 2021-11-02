import { useState } from 'react'
import apiClient from './apiClient'

const useDeleteTodo = () => {
  const [status, setStatus] = useState(undefined)

  const deleteTodo = async (id) => {
    const { status } = await apiClient.delete(`/api/todos/${id}`)

    setStatus(status)
  }

  return [status, deleteTodo]
}

export default useDeleteTodo