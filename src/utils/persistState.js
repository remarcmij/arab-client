export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('@arab/state');
    if (serializedState === null) {
      return {};
    }
    const state = JSON.parse(serializedState);
    return state;
  } catch (err) {
    return {};
  }
};

export const saveState = state => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('@arab/state', serializedState);
};
