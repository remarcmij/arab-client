import { useState } from 'react';

export default (cb: () => void = () => undefined) => {
  const [goBack, setGoBack] = useState<boolean>(false);
  const handleBack = () => {
    cb();
    setGoBack(true);
  };
  return [goBack, handleBack] as [boolean, () => void];
};
