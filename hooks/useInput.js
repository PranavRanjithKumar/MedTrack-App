import { useState } from 'react';

const useInput = () => {
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [touched, setTouched] = useState(false);

  const notEmpty = (val) => val.trim().length !== 0;

  const isValid = notEmpty(value) && touched;
  const isInValid = !notEmpty(value) && touched;

  const onChangeText = (inputValue) => {
    setTouched(true);
    setValue(inputValue);
  };

  const onFocus = () => setIsFocus(true);

  const onBlur = () => {
    setIsFocus(false);
    setTouched(true);
  };

  const reset = () => {
    setValue('');
    setIsFocus(false);
    setTouched(false);
  };

  return [
    { isValid, isInValid, isFocus, reset },
    { value, onChangeText, onFocus, onBlur },
  ];
};

export default useInput;
