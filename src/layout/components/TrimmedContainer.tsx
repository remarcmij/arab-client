import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';

const TrimmedContainer: React.FC = props => {
  return (
    <Grid container={true} justify="center">
      <Grid item={true} xs={12} md={8} lg={6}>
        <Paper>
          <Box flexDirection="column" mt={4} p={4}>
            {props.children}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TrimmedContainer;
