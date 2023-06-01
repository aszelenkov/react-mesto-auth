import { useState } from 'react';

export function usePopupState(initialState) {
  const [state, setState] = useState(initialState);

  const closeAllPopups = () => {
    Object.keys(state).forEach(key => {
      setState(prevState => ({ ...prevState, [key]: false }));
    });
  };

  const handlePopupStateChange = (popup, value) => {
    setState(prevState => ({ ...prevState, [popup]: value }));
  };

  return { state, closeAllPopups, handlePopupStateChange };
}