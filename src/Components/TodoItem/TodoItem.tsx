import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  onDeleteTodo: (value: number) => Promise<void>;
};

export const TodoItem: React.FC<Props> = ({
  todo: { id, title, completed },
  onDeleteTodo,
}) => {
  const [deletedTodoId, setDeletedTodoId] = useState<number | null>(null);

  const handleDelete = async () => {
    setDeletedTodoId(id);

    try {
      await onDeleteTodo(id);
    } finally {
      setDeletedTodoId(null);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control*/}
      <label className="todo__status-label" htmlFor={`input-${id}`}>
        <input
          id={`input-${id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
        />
      </label>
      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>
      {/* Remove button appears only on hover */}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={handleDelete}
        disabled={deletedTodoId === id}
      >
        ×
      </button>
      {/* overlay will cover the todo while it is being deleted or updated */}
      {deletedTodoId === id && (
        <div data-cy="TodoLoader" className="modal overlay is-active">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      )}
    </div>
  );
};
