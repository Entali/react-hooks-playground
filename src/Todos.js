import React from 'react';

const TodoList = ({todos}) => {
  return (
      <div style={{
        width: '300px',
        margin: '0 auto'
      }}>
        <ul style={{
          textAlign: 'left',
          listStyle: 'none'
        }}>
          {todos.map(todo => <TodoItem
              key={`${todo.id}-${todo.name}`} {...todo}/>)}
        </ul>
      </div>
  );
};

const TodoItem = ({name, isDone}) => {
  return (
      <li>
        <label>
          <span>
          <input
              type="checkbox"
              // checked={isDone}
          />
        </span>
          <span>{name}</span>
        </label>
      </li>
  )
};

export {
  TodoList,
  TodoItem
}
