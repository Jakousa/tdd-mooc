import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react-hooks'
import sinon from 'sinon'
import apiClient from './apiClient'

import useDeleteTodo from './useDeleteTodo';

test('is a hook that deletes a todo', async () => {
  const todo = { id: 1, text: 'Hello 1', completed: false}
  sinon.stub(apiClient, "delete").callsFake((url, data) => ({ status: 204 }))

  const { result, waitForNextUpdate } = renderHook(useDeleteTodo)
  const [_, func] = result.current

  func(todo.id)

  await waitForNextUpdate()

  expect(result.current[0]).toEqual(204)
});

afterEach(() => {
  sinon.restore()
})