import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import TrimmedContainer from './TrimmedContainer';

const Welcome: React.FC = () => {
  const [done, setDone] = useState(false);

  const handleClick = () => setDone(true);

  if (done) {
    return <Redirect to="/content" />;
  }

  return (
    <TrimmedContainer>
      <Typography variant="h5">Welcome</Typography>
      <Button onClick={handleClick} variant="contained" color="primary">
        Go to content
      </Button>
    </TrimmedContainer>
  );
};

export default Welcome;
