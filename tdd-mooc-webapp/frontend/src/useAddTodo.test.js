import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react-hooks'
import sinon from 'sinon'
import apiClient from './apiClient'

import useAddTodo from './useAddTodo';

test('is a hook that returns list of todos', async () => {
  const todo = { id: 1, text: 'Hello 1', completed: false}
  sinon.stub(apiClient, "post").callsFake((url, data) => ({ data }))

  const { result, waitForNextUpdate } = renderHook(useAddTodo)

  const [_, func] = result.current
  func(todo)

  await waitForNextUpdate()

  expect(result.current[0]).toEqual(todo)
});

afterEach(() => {
  sinon.restore()
})