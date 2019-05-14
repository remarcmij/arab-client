import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import React from 'react';
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
        minWidth: 120,
      },
    },
    source: {
      color: 'red',
    },
    target: {
      color: 'green',
    },
    roman: {
      color: 'blue',
    },
  });

interface OwnProps {
  lemmas: Types.Lemma[];
  showButtons?: boolean;
  onButtonClick?: (lemma: Types.Lemma) => void;
}

type Props = OwnProps & RouteComponentProps & WithStyles<typeof styles>;

const LemmaTable: React.FC<Props> = props => {
  const { classes, history, lemmas, showButtons, onButtonClick } = props;
  const { search } = history.location;

  const matches = decodeURI(search).match(/\bid=(\w+)/);
  const lemmaId = matches ? matches[1] : null;

  return (
    <div className={`markdown-body ${classes.root}`}>
      <table className={classes.mdTable}>
        <tbody>
          {lemmas &&
            lemmas.map(lemma => (
              <LemmaTableRow
                key={lemma._id}
                lemma={lemma}
                lemmaId={lemmaId}
                showButtons={showButtons}
                onButtonClick={onButtonClick}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default withRouter(withStyles(styles)(LemmaTable));
