import React, { useState, useCallback, useEffect } from 'react';
import Button from '~/shared/components/Button/Button';
import Input from '~/shared/components/Input/Input';
import { filterContainerStyles, buttonGroupStyles, searchInputStyles } from './TodoFilters.styles';
import useTodoStore from '~store/todo.store';
import { useDebounce } from '~/hooks/useDebounce';

const TodoFilters: React.FC = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');

  const fetchTodos = useTodoStore((state) => state.fetchTodos);
  const setPage = useTodoStore((state) => state.setPage);
  const page = useTodoStore((state) => state.page);
  const limit = useTodoStore((state) => state.limit);

  const debouncedSearch = useDebounce(search, 500);
  
  const handleFilterClick = useCallback((selectedStatus: string | null) => {
    setStatus(selectedStatus);
    setPage(1);
  }, [setPage]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);
  
  useEffect(() => {   
    fetchTodos({ search: debouncedSearch, status }, page, limit);
  }, [debouncedSearch, status, page, fetchTodos, limit]);

  return (
    <div className={filterContainerStyles}>
      <div className={buttonGroupStyles}>
        <Button onClick={() => handleFilterClick(null)} variant={status === null ? 'primary' : 'default'}>
          All
        </Button>
        <Button onClick={() => handleFilterClick('private')} variant={status === 'private' ? 'primary' : 'default'}>
          Private
        </Button>
        <Button onClick={() => handleFilterClick('public')} variant={status === 'public' ? 'primary' : 'default'}>
          Public
        </Button>
        <Button onClick={() => handleFilterClick('completed')} variant={status === 'completed' ? 'primary' : 'default'}>
          Completed
        </Button>
      </div>
      <Input
        id="search-input"
        name="search"
        type="text"
        value={search}
        placeholder="Search..."
        onChange={handleSearchChange}
        containerClassName={searchInputStyles}
      />
    </div>
  );
};

export default TodoFilters;
