import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TodoList from './TodoList';

test('renders a list of todos', () => {
  const todos = ['Hello 1', 'Hello 2'].map((text, idx) => ({ id: idx, text }))
  render(<TodoList todos={todos} />);
  expect(screen.getByText(/Hello 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Hello 2/i)).toBeInTheDocument();
});
