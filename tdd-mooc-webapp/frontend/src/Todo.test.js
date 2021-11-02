import '@testing-library/jest-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import Todo from './Todo';
import sinon from 'sinon'
import * as useUpdateTodo from './useUpdateTodo'

const todos = ['Hello 1'].map((text, idx) => ({ id: idx, text, completed: false }))

const setup = () => {
  const utils = render(<Todo todo={todos[0]} />);
  const button = utils.getByLabelText('todo-completed-button')
  return { button }
}

test('renders todo text', () => {
  setup()
  const linkElement = screen.getByText(/Hello 1/i);
  expect(linkElement).toBeInTheDocument();
});

test('shows button if todo is not completed', () => {
  const { button } = setup()
  expect(within(button).getByText('Mark as completed')).toBeInTheDocument()
})

test('shows completed text if todo is completed', () => {
  render(<Todo todo={{ ...todos[0], completed: true }} />);
  const linkElement = screen.getByText(/Completed/i);
  expect(linkElement).toBeInTheDocument();  
})

test('todo is updated by update button', () => {
  const updateTodoStub = sinon.stub()
  sinon.stub(useUpdateTodo, 'default').returns([todos[0], updateTodoStub])

  const { button } = setup()

  button.click()

  expect(updateTodoStub.callCount).toEqual(1)
});

afterEach(() => {
  sinon.restore()
})