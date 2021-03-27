import React, {useRef, useReducer} from 'react';
import CreateInput from '../components/CreateInput';
import {useTitle} from 'react-use';

const notDoneTodos = todos => todos.reduce((memo, todo) =>
    (!todo.isDone ? memo + 1 : memo), 0);

const Todos = () => {
  const todoId = useRef(0);
  const [todos, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        todoId.current += 1;
        return [
          ...state,
          {
            id: todoId.current,
            name: action.name,
            isDone: false
          }
        ];
      case 'UPDATE_TODO':
        return [
          ...state,
          state.map(todo =>
              todo.id === action.id
                  ? {...todo, isDone: !todo.isDone}
                  : todo
          )
        ];
      case 'DELETE_TODO':
        return state.filter(todo => todo.id !== action.id);
      default:
        return state;
    }
  }, []);
  console.log('todoId',todoId)
  // Todos document title counter
  const notDoneCount = notDoneTodos(todos);
  const title = notDoneCount ? `Todos - ${notDoneCount}` : 'Todos - 0';
  useTitle(title);

  // CRUD
  const onCreate = (name) => {
    dispatch({type: 'ADD_TODO', name});
  };

  const onDelete = (id) => () => {
    dispatch({type: 'DELETE_TODO', id});
  }

  const onChangeIsDone = (id) => () => {
    dispatch({type: 'UPDATE_TODO', id});
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
