import React, { useState, useCallback } from 'react';
import useTodoStore from '~store/todo.store';
import { ITodo } from '~shared/services/types';
import { elementStyles, buttonGroupStyles } from '~/components/TodoElement/TodoElement.styles';
import Input from '~/shared/components/Input/Input';
import Button from '~/shared/components/Button/Button';
import { useAuthStore } from "~/store/auth.store";

interface TodoElementProps {
  todo: ITodo;
}

const TodoElement: React.FC<TodoElementProps> = ({ todo }) => {
  const { removeTodo, updateTodo } = useTodoStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const userId = useAuthStore((state) => state.userId);

  const handleDelete = useCallback(() => {
    removeTodo(todo.id);
  }, [removeTodo, todo.id]);

  const handleToggleComplete = useCallback(() => {
    updateTodo(todo.id, { isCompleted: !todo.isCompleted });
  }, [updateTodo, todo.id, todo.isCompleted]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleSave = useCallback(() => {
    if (!editTitle.trim() || !editDescription.trim()) {
      alert('Please fill in both Title and Description fields.');
      return;
    }

    if (editDescription.trim().length < 10) {
      alert('Description must be at least 10 characters long.');
      return;
    }

    updateTodo(todo.id, { title: editTitle.trim(), description: editDescription.trim() });
    setIsEditing(false);
  }, [editTitle, editDescription, todo.id, updateTodo]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
  }, [todo.title, todo.description]);

  return (
    <div className={elementStyles}>
      {isEditing ? (
        <div>
          <Input
            type="text"
            id={`title-${todo.id}`}
            name="title"
            placeholder="Edit Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            multiline
          />
          <Input
            type="text"
            id={`description-${todo.id}`}
            name="description"
            placeholder="Edit Description"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            multiline
          />
          <div className={buttonGroupStyles}>
            <Button onClick={handleSave} variant="primary" size="small">Save</Button>
            <Button onClick={handleCancel} variant="primary" size="small">Cancel</Button>
          </div>
        </div>
      ) : (
        <div>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          {todo.userId.toString() === userId ? (
            <div className={buttonGroupStyles}>
              <Button onClick={handleToggleComplete} variant="primary" size="small">
                {todo.isCompleted ? 'Undo' : 'Complete'}
              </Button>
              <Button onClick={handleEdit} variant="primary" size="small">Edit</Button>
              <Button onClick={handleDelete} variant="primary" size="small">Delete</Button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default TodoElement;
