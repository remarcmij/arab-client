import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import LRU from 'lru-cache';
import { UserProfileContext } from '../contexts/UserProfileProvider';
import { getToken } from '../services/token-service';

const cache = new LRU<string, any>();

const useFetch = <T>(url: string | null, externalDep?: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { clearProfile } = useContext(UserProfileContext);

  useEffect(() => {
    if (!url) {
      return;
    }

    const encodedUrl = encodeURI(url);

    setError(null);
    setLoading(true);
    const item = cache.get(encodedUrl) as T;
    if (item) {
      // tslint:disable-next-line no-console
      console.log(`cache hit for ${encodedUrl}`);
      setData(item);
      setLoading(false);
      return;
    }

    const headers: { [key: string]: string } = {};
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    axios
      .get<T>(encodedUrl, { headers })
      .then(response => {
        setData(response.data);
        setLoading(false);
        cache.set(encodedUrl, response.data);
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 401) {
            clearProfile();
          }
        }
        setLoading(false);
        setError(err);
      });
  }, [url, clearProfile, externalDep]);

  return { data, loading, error };
};

export default useFetch;
