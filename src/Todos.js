import React, {useState} from 'react';
import CreateInput from './CreateInput';

const Todos = () => {
  const [todos, setTodos] = useState([]);

  const onCreate = (name) => {
    return setTodos(todos => [...todos, {
      id: todos.length,
      name,
      isDone: false
    }]);
  };

  const onChangeIsDone = (id) => {}
  // const onDelete = (id) => {}

  return (
      <div style={{
        width: '250px',
        margin: '40px auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <CreateInput onPress={onCreate}/>
        <TodoList todos={todos} onChangeIsDone={onChangeIsDone}/>
      </div>
  )
}

const TodoList = ({todos, onChangeIsDone}) => {
  return (
      <ul style={{
        padding: '0',
        textAlign: 'left',
        listStyle: 'none'
      }}>
        {todos.map(todo =>
            <TodoItem
                key={`${todo.id}-${todo.name}`} {...todo}
                onChangeIsDone={onChangeIsDone}
            />)}
      </ul>
  );
};

const TodoItem = ({id, name, isDone, onChangeIsDone}) => {
  const onChange = (id) => onChangeIsDone(id);

  return (
      <li>
        <label>
          <span>
          <input
              type="checkbox"
              checked={isDone}
              onChange={onChange(id)}
          />
        </span>
          <span>{name}</span>
        </label>
      </li>
  )
};

export default Todos;
