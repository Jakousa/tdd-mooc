import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react-hooks'
import sinon from 'sinon'
import apiClient from './apiClient'

import useGetTodos from './useGetTodos';

test('is a hook that returns list of todos', async () => {
  const todos = ['Hello 1', 'Hello 2'].map((text, idx) => ({ id: idx, text }))
  sinon.stub(apiClient, "get").callsFake(() => ({ data: todos}))

  const { result, waitForNextUpdate } = renderHook(useGetTodos)

  await waitForNextUpdate()
  
  expect(result.current).toEqual(todos)
});

afterEach(() => {
  sinon.restore()
})