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
  sinon.stub(useGetTodos, 'default').returns([{ text: 'Hello 1'}, { text: 'Hello 2'}])

  render(<App />);
  await waitFor(() => screen.getByText(/Hello 1/i))
  const linkElement = screen.getByText(/Hello 1/i);

  expect(linkElement).toBeInTheDocument();
});

test('includes a TodoInput', async () => {
  sinon.stub(useGetTodos, 'default').returns([{ text: 'Hello 1'}, { text: 'Hello 2'}])

  const utils = render(<App />);
  utils.getByLabelText('todo-input')
});

afterEach(() => {
  sinon.restore()
})