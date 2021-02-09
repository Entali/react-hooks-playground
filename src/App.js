import React, {useState} from 'react';
import Todos from './Todos';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);

  return (
      <div className="App">
        <Todos todos={todos} setTodos={setTodos}/>
      </div>
  );
}





export default App;
