const TOKEN_NAME = '@arab/token';

export const setToken = (token: string) =>
  window.localStorage.setItem(TOKEN_NAME, token);
export const getToken = () => window.localStorage.getItem(TOKEN_NAME);
export const removeToken = () => window.localStorage.removeItem(TOKEN_NAME);
