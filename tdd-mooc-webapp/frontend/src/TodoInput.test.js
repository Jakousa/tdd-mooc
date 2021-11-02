import '@testing-library/jest-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import TodoInput from './TodoInput';
import sinon from 'sinon'
import * as useAddTodo from './useAddTodo'

const setup = () => {
  const utils = render(<TodoInput />);
  const input = utils.getByLabelText('todo-input')
  const button = utils.getByLabelText('todo-send-button')
  return { input, button }
}

test('renders an input for todos', () => {
  const utils = render(<TodoInput />);
  utils.getByLabelText('todo-input')
});

test('renders an button for sending todos', () => {
  const utils = render(<TodoInput />);
  const button = utils.getByLabelText('todo-send-button')
  expect(within(button).getByText('Add todo')).toBeInTheDocument()
});

test('input value is sent by button', () => {
  const addTodoStub = sinon.stub()
  sinon.stub(useAddTodo, 'default').returns([{ id: 1, text: 'Hello 1', completed: false }, addTodoStub])

  const { input, button } = setup()

  fireEvent.change(input, { target: { value: 'Say hello'}})
  button.click()

  expect(addTodoStub.callCount).toEqual(1)
});
