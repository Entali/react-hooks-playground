import React from 'react';

const Todos = ({todos}) => {
  return (
      <div style={{
        width: '250px',
        margin: '40px auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <TodoInput/>
        <TodoList todos={todos}/>
      </div>
  )
}

const TodoInput = () => {
  return (
      <input
          style={{
            height: '40px',
            boxSizing: 'border-box',
            margin: '4px',
            padding: '5px 10px'
          }}
          type="text"
      />
  )
}

const TodoList = ({todos}) => {
  return (
      <ul style={{
        padding: '0',
        textAlign: 'left',
        listStyle: 'none'
      }}>
        {todos.map(todo => <TodoItem
            key={`${todo.id}-${todo.name}`} {...todo}/>)}
      </ul>
  );
};

const TodoItem = ({name, isDone}) => {
  return (
      <li>
        <label>
          <span>
          <input
              type="checkbox"
              checked={isDone}
          />
        </span>
          <span>{name}</span>
        </label>
      </li>
  )
};

export default Todos;
