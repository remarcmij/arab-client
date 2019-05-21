import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import Types from 'Types';
import LemmaTableRow from './LemmaTableRow';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing.unit * 3,
    },
    mdTable: {
      '& td': {
        width: 240,
      },
    },
    nl: {
      color: 'red',
    },
    ar: {
      color: 'green',
    },
    rom: {
      color: 'blue',
    },
  });

interface OwnProps {
  lemmas: Types.Lemma[];
}

type Props = OwnProps & RouteComponentProps & WithStyles<typeof styles>;

const LemmaTable: React.FC<Props> = props => {
  const { classes, history, lemmas } = props;
  const [hashId, setHashId] = useState('');

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const { hash } = history.location;
    setHashId(hash ? hash.slice(1) : '');
  }, []);

  return (
    <div className={`markdown-body ${classes.root}`}>
      <table className={classes.mdTable}>
        <tbody>
          {lemmas &&
            lemmas.map(lemma => (
              <LemmaTableRow key={lemma._id} lemma={lemma} hashId={hashId} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default withRouter(withStyles(styles)(LemmaTable));
