import axios from 'axios';

export const TOKEN_KEY = '@arab/token';

function setAuthorizationHeader() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}

export function storeToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
  setAuthorizationHeader();
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
  setAuthorizationHeader();
}

setAuthorizationHeader();
