import React, {useRef} from 'react';
import CreateInput from '../components/CreateInput';
import {useTitle} from 'react-use';
import useLocalStorage from '../hooks/useLocalStorage';

const notDoneTodos = todos => todos.reduce((memo, todo) =>
    (!todo.isDone ? memo + 1 : memo), 0);

const createId = (values, id) => id.current = values.reduce((memo, item) =>
    Math.max(memo, item.id), 0);

const Todos = () => {
  const todoId = useRef(0);
  const [todos, setTodos] = useLocalStorage(
      "todos",
      [],
      todos => createId(todos, todoId)
  );

  const notDoneCount = notDoneTodos(todos);
  const title = notDoneCount ? `Todos - ${notDoneCount}` : 'Todos - 0';
  useTitle(title);

  const onCreate = (name) => {
    todoId.current += 1;
    return setTodos(prevTodos => [...prevTodos, {
      id: todoId.current,
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
        alignItems: 'center',
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
          <span style={{
            display: 'inline-flex',
            marginLeft: '5px',
            textDecoration: isDone && 'line-through'
          }}>
            {name}
          </span>
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
