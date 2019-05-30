import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import markdownIt from 'markdown-it';
import React, { useMemo, useState } from 'react';
import { Redirect } from 'react-router-dom';
import mdText from './welcome-nl';

const md = markdownIt();

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: -60,
      overflowX: 'auto',
      padding: theme.spacing(4),
    },
  });

type Props = WithStyles<typeof styles>;

const Welcome: React.FC<Props> = props => {
  const { classes } = props;
  const [done, setDone] = useState(false);

  const htmlText = useMemo(() => md.render(mdText), []);

  const handleClick = () => setDone(true);

  if (done) {
    return <Redirect to="/content" />;
  }

  return (
    <Paper className={classes.root}>
      <article
        dangerouslySetInnerHTML={{ __html: htmlText }}
        className={`markdown-body `}
      />
      <Button onClick={handleClick}>Go to content</Button>
    </Paper>
  );
};

export default withStyles(styles)(Welcome);
