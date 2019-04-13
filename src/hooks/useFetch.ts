import { useState, useEffect } from 'react';
import axios from 'axios';
import LRU from 'lru-cache';

const cache = new LRU<string, any>();

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setError(null);
    setLoading(true);
    const item = cache.get(url) as T;
    if (item) {
      // tslint:disable-next-line no-console
      console.log(`cache hit for ${url}`);
      setData(item);
      setLoading(false);
      return;
    }

    axios
      .get<T>(url)
      .then(response => {
        setData(response.data);
        setLoading(false);
        cache.set(url, response.data);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  }, []);

  return { data, loading, error };
};

export default useFetch;
