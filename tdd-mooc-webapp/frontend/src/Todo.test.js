import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Todo from './Todo';

test('renders todo text', () => {
  const todos = ['Hello 1', 'Hello 2'].map((text, idx) => ({ id: idx, text }))
  render(<Todo todo={todos[0]} />);
  const linkElement = screen.getByText(/Hello 1/i);
  expect(linkElement).toBeInTheDocument();
});
