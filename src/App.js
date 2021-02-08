import React, {useState} from 'react';
import {TodoList} from './Todos';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState(
      [
          {id: '0', name: 'Buy a milk', isDone: false},
          {id: '1', name: 'Read a book', isDone: false}
        ]
  )

  return (
      <div className="App">
        <TodoList todos={todos}/>
      </div>
  );
}





export default App;
