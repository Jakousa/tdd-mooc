import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react-hooks'
import sinon from 'sinon'
import apiClient from './apiClient'

import useUpdateTodo from './useUpdateTodo';

test('is a hook that updates todo as completed and returns it', async () => {
  const todo = { id: 1, text: 'Hello 1', completed: false}
  sinon.stub(apiClient, "put").callsFake((url, data) => ({ data: { ...todo, ...data } }))

  const { result, waitForNextUpdate } = renderHook(useUpdateTodo)
  const [_, func] = result.current

  func(todo.id, { completed: true })

  await waitForNextUpdate()

  expect(result.current[0].completed).toEqual(true)
});

test('accepts todo as parameter and returns it by default', async () => {
  const todo = { id: 1, text: 'Hello 1', completed: false}
  const { result } = renderHook(() => useUpdateTodo(todo))
  const [todoFromHook] = result.current

  expect(todoFromHook).toEqual(todo)
})

afterEach(() => {
  sinon.restore()
})