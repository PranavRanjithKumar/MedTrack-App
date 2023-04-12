import { useState } from 'react';

const useInput = (initialState, validationFns) => {
  const [value, setValue] = useState(initialState);
  const [isFocus, setIsFocus] = useState(false);
  const [touched, setTouched] = useState(false);

  const inputIsValid = (val) =>
    validationFns.reduce((isValid, validationFunction) => {
      return isValid && validationFunction(val);
    }, true);

  const isValid = inputIsValid(value) && touched;
  const isInValid = !inputIsValid(value) && touched;

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
