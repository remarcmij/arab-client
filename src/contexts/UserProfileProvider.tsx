import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { setToken, getToken, removeToken } from '../services/token-service';

export interface UserProfile {
  email: string;
  role: string;
  photo: string;
}

interface UserProfileContextProps {
  profile: UserProfile | null;
  clearProfile: () => void;
}

export const UserProfileContext = React.createContext<UserProfileContextProps>({
  profile: null,
  clearProfile: () => undefined,
});

export const UserProfileProvider: React.FC = props => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  useEffect(() => {
    const cookies = new Cookies();
    let token = cookies.get('token');
    if (token) {
      setToken(token);
      cookies.remove('token');
    }
    token = getToken();
    if (token) {
      const headers: { [key: string]: string } = {};
      headers.Authorization = `Bearer ${token}`;
      axios
        .get<UserProfile>('/api/profile', { headers })
        .then(res => setProfile(res.data))
        .catch(err => console.error(err));
    }
  }, []);

  const clearProfile = () => {
    removeToken();
    setProfile(null);
  };

  return (
    <UserProfileContext.Provider value={{ profile, clearProfile }}>
      {props.children}
    </UserProfileContext.Provider>
  );
};
