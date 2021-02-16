import {useEffect, useState} from "react";

const useLocalStorage = (key, defaultValue, callback) => {
  // useState также принимает функции
  // здесь используется функция чтобы прочитать из localStorage
  // только один раз, а не перед каждым рендером

  const initialValue = () => {
    const valueFromStorage = JSON.parse(
        window.localStorage.getItem(key) || JSON.stringify(defaultValue)
    );
    if (callback) {
      callback(valueFromStorage);
    }
    return valueFromStorage;
  }

  const [storage, setStorage] = useState(initialValue);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storage));
  }, [key, storage]);

  return [storage, setStorage];
};

export default useLocalStorage;
