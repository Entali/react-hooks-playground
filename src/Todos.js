import React, {useState} from 'react';
import CreateInput from './CreateInput';

const Todos = () => {
  const [todos, setTodos] = useState([]);

  const onCreate = (name) => {
    console.log('onCreate')
    return setTodos(prevTodos => [...prevTodos, {
      id: todos.length,
      name,
      isDone: false
    }]);
  };

  const onDelete = (id) => () => {
    return setTodos(
        prevTodos => prevTodos.filter(todo => todo.id !== id)
    );
  }

  // const onChangeIsDone = (id) => {}

  return (
      <div style={{
        width: '250px',
        margin: '40px auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <CreateInput onPress={onCreate}/>
        <TodoList todos={todos} onDelete={onDelete}/>
      </div>
  )
}

const TodoList = ({todos, onDelete}) => {
  return (
      <ul style={{
        padding: '0',
        textAlign: 'left',
        listStyle: 'none'
      }}>
        {todos.map(todo =>
            <TodoItem
                key={`${todo.id}-${todo.name}`} {...todo}
                onDelete={onDelete}
            />)}
      </ul>
  );
};

const TodoItem = ({id, name, isDone, onDelete}) => {

  return (
      <li style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '3px'
      }}>
        <label>
          <span>
          <input
              type="checkbox"
              checked={isDone}
              onChange={() => null}
          />
        </span>
          <span>{name}</span>
        </label>
        <span style={{
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
              onClick={onDelete(id)}
        >
          x
        </span>
      </li>
  )
};

export default Todos;
