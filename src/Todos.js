import React, {useState, useEffect, useRef} from 'react';
import CreateInput from './CreateInput';

const Todos = () => {
  const todoId = useRef(0);
  // useState также принимает функции
  // здесь используется функция чтобы прочитать из localStorage
  // только один раз, а не перед каждым рендером
  const initialTodos = () => {
    const valueFromStorage = JSON.parse(
        window.localStorage.getItem("todos") || "[]"
    );

    todoId.current = valueFromStorage.reduce((memo, todo) => {
      return Math.max(memo, todo.id);
    }, 0);

    return valueFromStorage;
  }

  const [todos, setTodos] = useState(initialTodos);

  useEffect(() => {
    if (todos) {
      window.localStorage.setItem(
          "todos",
          JSON.stringify(todos)
      )
    }
  }, [todos]);

  useEffect(() => {
    const notDoneTodos = todos.reduce((memo, todo) => {
      return !todo.isDone ? memo + 1 : memo
    }, 0);

    document.title = notDoneTodos ? `Todos - ${notDoneTodos}` : 'Todos - 0';
  });

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
