import React from 'react';
import TodoElement from '~/components/TodoElement/TodoElement';
import Pagination from '~/shared/components/Pagination/Pagination';
import { gridContainer } from '~/components/TodoList/TodoList.styles';
import { ITodo } from '~/shared/services/types';

interface MobileTodoListProps {
  todos: ITodo[];
  totalPages: number;
  page: number;
  limit: number;
  total: number;
  setPage: (page: number) => void;
}

const MobileTodoList: React.FC<MobileTodoListProps> = ({ todos, totalPages, page, limit, total, setPage }) => (
  <div>
    <div className={gridContainer}>
      {todos.map((todo) => (
        <TodoElement key={todo.id} todo={todo} />
      ))}
    </div>
    {totalPages > 1 && (
      <Pagination total={total} limit={limit} currentPage={page} onPageChange={setPage} />
    )}
  </div>
);

export default MobileTodoList;
