export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('@arab/state');
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {};
  }
};

export const saveState = state => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('@arab/state', serializedState);
};
