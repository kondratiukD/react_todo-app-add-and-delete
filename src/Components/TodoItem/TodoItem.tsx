import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  onDeleteTodo: (value: number) => Promise<void>;
};

export const TodoItem: React.FC<Props> = ({ todo, onDeleteTodo }) => {
  const [deletedTodoId, setDeletedTodoId] = useState<number | null>(null);

  const handleDelete = async () => {
    setDeletedTodoId(todo.id);

    try {
      await onDeleteTodo(todo.id);
    } finally {
      setDeletedTodoId(null);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control*/}
      <label className="todo__status-label" htmlFor={`input-${todo.id}`}>
        <input
          id={`input-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
        />
      </label>
      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>
      {/* Remove button appears only on hover */}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={handleDelete}
        disabled={deletedTodoId === todo.id}
      >
        ×
      </button>
      {/* overlay will cover the todo while it is being deleted or updated */}
      {deletedTodoId === todo.id && (
        <div data-cy="TodoLoader" className="modal overlay is-active">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      )}
    </div>
  );
};
