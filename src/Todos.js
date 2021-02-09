import React, {useState} from 'react';
import CreateInput from './CreateInput';

const Todos = () => {
  const [todos, setTodos] = useState([]);

  const onCreate = (name) => {
    return setTodos(prevTodos => [...prevTodos, {
      id: Date.now(),
      name,
      isDone: false
    }]);
  };

  const onDelete = (id) => () => {
    return setTodos(
        prevTodos => prevTodos.filter(todo => todo.id !== id)
    );
  }

  const onChangeIsDone = (id) => () => {
    return setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? {
      ...todo,
      isDone: !todo.isDone
    } : todo));
  };

  return (
      <div style={{
        width: '250px',
        margin: '40px auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <CreateInput onPress={onCreate}/>
        <TodoList
            todos={todos}
            onDelete={onDelete}
            onChangeIsDone={onChangeIsDone}
        />
      </div>
  )
}

const TodoList = (props) => {
  const {todos, onDelete, onChangeIsDone} = props;
  return (
      <ul style={{
        padding: '0',
        textAlign: 'left',
        listStyle: 'none'
      }}>
        {todos.map(todo =>
            <TodoItem
                {...todo}
                key={todo.id}
                onDelete={onDelete}
                onChangeIsDone={onChangeIsDone}
            />)}
      </ul>
  );
};

const TodoItem = (props) => {
  const {id, name, isDone, onDelete, onChangeIsDone} = props;
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
              onChange={onChangeIsDone(id)}
          />
        </span>
          <span>{name}</span>
        </label>
        <span style={{
          cursor: 'pointer',
          fontWeight: 'bold'
        }} onClick={onDelete(id)}>
          x
        </span>
      </li>
  )
};

export default Todos;
