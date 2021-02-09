import React, {useState} from 'react';

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


const CreateInput = ({onPress}) => {
  const [name, setName] = useState('');
  const onChange = (e) => setName(e.target.value);

  const onKeyPress = (e) => {
    if (!name) return;
    if (e.which === 13 || e.keyCode === 13) {
      onPress(name);
      setName('');
    }
    return name;
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
