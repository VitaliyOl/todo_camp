import React from 'react';
import { useMediaQuery } from 'react-responsive';
import useTodoStore from '~store/todo.store';
import { THEME } from '~shared/styles/theme';
import MobileTodoList from '~/components/TodoListViews/MobileTodoList';
import TabletTodoList from '~/components/TodoListViews/TabletTodoList';
import DesktopTodoList from '~/components/TodoListViews/DesktopTodoList';

const TodoList: React.FC = () => {
  const todos = useTodoStore((state) => state.todos);
  const total = useTodoStore((state) => state.total);
  const page = useTodoStore((state) => state.page);
  const limit = useTodoStore((state) => state.limit);
  const setPage = useTodoStore((state) => state.setPage);

  const totalPages = Math.ceil(total / limit);
  const isMobile = useMediaQuery({ query: THEME.breakpoints.mobile });
  const isTablet = useMediaQuery({ query: THEME.breakpoints.tablet });

  return (
    <div>
      {todos.length === 0 && page === 1 && <div>No todos found</div>}

      {isMobile && (
        <MobileTodoList
          todos={todos}
          totalPages={totalPages}
          page={page}
          limit={limit}
          total={total}
          setPage={setPage}
        />
      )}
      {isTablet && (
        <TabletTodoList
          todos={todos}
          page={page}
          limit={limit}
          total={total}
          setPage={setPage}
        />
      )}
      {!isMobile && !isTablet && (
        <DesktopTodoList
          todos={todos}
          totalPages={totalPages}
          page={page}
          limit={limit}
          total={total}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default TodoList;
