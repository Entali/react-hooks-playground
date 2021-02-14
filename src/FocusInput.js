import React, {useRef} from 'react';

const FocusInput = () => {
  const inputRef = useRef();

  const onClick = () => {
    inputRef.current.focus();
    inputRef.current.select();
  };

  return (
      <div style={{
        margin: '20px'
      }}>
        <input type="text" autoFocus ref={inputRef}/>
        <button onClick={onClick}>focus</button>
      </div>
  );
};

export default FocusInput;
