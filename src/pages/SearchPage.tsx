import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { Lemma } from 'Types';
import SearchResultList from '../components/SearchResultList';
import withNavBar from '../components/withNavBar';
import WordClickHandler from '../components/WordClickHandler';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(1),
      overflowX: 'auto',
      padding: theme.spacing(4),
    },
  });

type Props = {
  lemmas: Lemma[];
  searchLemmas: (term: string) => void;
  setNavBackRoute: (to: string) => void;
} & RouteComponentProps &
  WithStyles<typeof styles>;

const SearchPage: React.FC<Props> = props => {
  const [lemma, setLemma] = useState<Lemma | null>(null);

  const {
    searchLemmas,
    history: {
      location: { search },
    },
  } = props;

  useEffect(() => {
    if (search) {
      const matches = decodeURI(search).match(/\bq=(.*)$/);
      if (matches) {
        searchLemmas(matches[1]);
      }
    }
  }, [searchLemmas, search]);

  if (lemma) {
    const [publication, article] = lemma.filename.split('.');
    const url = encodeURI(`/content/${publication}/${article}#${lemma._id}`);
    return <Redirect to={url} />;
  }

  return (
    <WordClickHandler>
      {props.lemmas && (
        <SearchResultList lemmas={props.lemmas} onButtonClick={setLemma} />
      )}
    </WordClickHandler>
  );
};

export default withNavBar(withStyles(styles)(SearchPage));
