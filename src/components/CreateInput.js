import React, {useState} from 'react';

const style = {
  height: '40px',
  boxSizing: 'border-box',
  margin: '4px',
  padding: '5px 10px'
};

const CreateInput = (props) => {
  const {onPress} = props;
  const [name, setName] = useState('');
  const onChange = (e) => setName(e.target.value);

  const onKeyPress = (name) => (e) => {
    if (!name) return;
    const {which, keyCode} = e;
    if (which === 13 || keyCode === 13) {
      onPress(name);
      setName('');
    }
    return name;
  }

  return (
      <input
          type="text"
          style={style}
          value={name}
          onChange={onChange}
          onKeyPress={onKeyPress(name)}
      />
  )
};

export default CreateInput;
