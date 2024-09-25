import React from 'react';
import AddTodoForm from '~/components/AddTodoForm/AddTodoForm';
import TodoList from '~/components/TodoList/TodoList';
import TodoFilter from '~/components/TodoFilters/TodoFilters';
import { containerStyles } from '~/components/TodoContainer/TodoContainer.styles';

const TodoContainer: React.FC = () => {
  return (
    <div className={containerStyles}>
      <TodoFilter />
      <AddTodoForm />
      <TodoList />
    </div>
  );
};

export default TodoContainer;