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
          type="text"
          style={style}
          value={name}
          onChange={onChange}
          onKeyPress={onKeyPress}
      />
  )
};

export default CreateInput;
