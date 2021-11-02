import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import sinon from 'sinon'
import * as useGetTodos from './useGetTodos'


import App from './App';

test('renders Hello from frontend', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello from frontend/i);
  expect(linkElement).toBeInTheDocument();
});

test('includes a TodoList', async () => {
  render(<App />);
  await waitFor(() => screen.getByText(/Hello 1/i))
  const linkElement = screen.getByText(/Hello 1/i);

  expect(linkElement).toBeInTheDocument();
});

test('includes a TodoInput', async () => {
  const utils = render(<App />);
  utils.getByLabelText('todo-input')
});

beforeEach(() => {
  const todos = ['Hello 1', 'Hello 2'].map((text, idx) => ({ id: idx, text }))
  sinon.stub(useGetTodos, 'default').returns(todos)
})

afterEach(() => {
  sinon.restore()
})