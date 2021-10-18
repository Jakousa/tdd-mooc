import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Hello from frontend', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello from frontend/i);
  expect(linkElement).toBeInTheDocument();
});
