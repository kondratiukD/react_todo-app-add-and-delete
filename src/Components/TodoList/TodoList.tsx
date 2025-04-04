import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  onDeleteTodo: (value: number) => Promise<void>;
  loading: boolean;
};

export const TodoList: React.FC<Props> = ({ todos, onDeleteTodo, loading }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDeleteTodo={onDeleteTodo}
          loading={loading}
        />
      ))}
    </section>
  );
};
