import React, {useState} from 'react';
import './App.css';

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <Playground/>
        </header>
      </div>
  );
}

const Playground = () => {
  const [state, setState] = useState({
    text: '',
    checked: false
  })

  const mergeState = partialState => setState((prevState => ({
    ...prevState,
    ...partialState
  })));

  const onTextChange = e => mergeState({ text: e.target.value});
  const onCheckboxChange = () => mergeState({
    checked: !state.checked
  });

  return (
      <div style={{
        width: '300px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <input type="text" onChange={onTextChange}/>
        <input type="checkbox" onChange={onCheckboxChange}/>
        <input type="text" value={state.text} readOnly/>
        <input type="text" value={state.checked.toString()} readOnly/>
      </div>
  )
}



export default App;
