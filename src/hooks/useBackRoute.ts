import { useEffect } from 'react';

export default (setRoute: (to: string) => void, to: string) =>
  useEffect(() => {
    setRoute(to);
  }, [setRoute, to]);
