import React, {useState} from 'react';

const Todos = ({todos, setTodos}) => {
  return (
      <div style={{
        width: '250px',
        margin: '40px auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <TodoInput
            setTodos={setTodos}
            todosLength={todos.length}
        />
        <TodoList todos={todos}/>
      </div>
  )
}


const TodoInput = ({setTodos, todosLength}) => {
  const [name, setName] = useState('');

  const onChange = (e) => setName(e.target.value);

  const onKeyPress = (e) => {
    if (!name) return;
    if (e.which === 13 || e.keyCode === 13) {
      setTodos(todos => [...todos, {
        id: todosLength,
        name,
        isDone: false
      }]);
      setName('');
    }
  }

  return (
      <input
          style={{
            height: '40px',
            boxSizing: 'border-box',
            margin: '4px',
            padding: '5px 10px'
          }}
          type="text"
          value={name}
          onChange={onChange}
          onKeyPress={onKeyPress}
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
