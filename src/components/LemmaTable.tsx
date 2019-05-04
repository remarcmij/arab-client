import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import React from 'react';
import Types from 'Types';
import LemmaTableRow from './LemmaTableRow';
import { withRouter, RouteComponentProps } from 'react-router';

const styles = (theme: Theme) => createStyles({});

interface OwnProps {
  lemmas: Types.Lemma[];
  showButtons?: boolean;
  onButtonClick?: (lemma: Types.Lemma) => void;
}

type Props = OwnProps & RouteComponentProps & WithStyles<typeof styles>;

const LemmaTable: React.FC<Props> = props => {
  const { history, lemmas, showButtons, onButtonClick } = props;
  const { search } = history.location;

  const matches = decodeURI(search).match(/\bid=(\d+)/);
  const lemmaId = matches ? parseInt(matches[1], 10) : null;

  return (
    <Table padding="dense">
      <TableBody>
        {lemmas &&
          lemmas.map(lemma => (
            <LemmaTableRow
              key={lemma.id}
              lemma={lemma}
              lemmaId={lemmaId}
              showButtons={showButtons}
              onButtonClick={onButtonClick}
            />
          ))}
      </TableBody>
    </Table>
  );
};

export default withRouter(withStyles(styles)(LemmaTable));
