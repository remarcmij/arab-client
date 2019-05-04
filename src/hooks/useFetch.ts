import { useState, useEffect } from 'react';
import axios from 'axios';
import LRU from 'lru-cache';

const cache = new LRU<string, any>();

const useFetch = <T>(url: string | null, deps: any[] = []) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

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

    axios
      .get<T>(encodedUrl)
      .then(response => {
        setData(response.data);
        setLoading(false);
        cache.set(encodedUrl, response.data);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  }, deps);

  return { data, loading, error };
};

export default useFetch;
