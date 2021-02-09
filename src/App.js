import React, {useState} from 'react';
import Todos from './Todos';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState(
      [
          {id: 0, name: 'Buy a milk', isDone: false},
          {id: 1, name: 'Read a book', isDone: false}
        ]
  )

  return (
      <div className="App">
        <Todos todos={todos} setTodos={setTodos}/>
      </div>
  );
}





export default App;
