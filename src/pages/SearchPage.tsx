import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import { ValueType } from 'react-select/lib/types';
import Types from 'Types';
import * as C from '../components/constants';
import GridContainer from '../components/GridContainer';
import NavBar from '../components/NavBar';
import SearchBox, { WordOption } from '../components/SearchBox';
import SearchResultList from '../components/SearchResultList';
import WordClickHandler from '../components/WordClickHandler';
import useFetch from '../hooks/useFetch';
import useGoBack from '../hooks/useGoBack';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit,
      overflowX: 'auto',
      padding: theme.spacing.unit * 4,
    },
  });

type Props = RouteComponentProps & WithStyles<typeof styles>;

const SearchPage: React.FC<Props> = props => {
  const [searchTerm, setSearchTerm] = useState('');
  const [lemma, setLemma] = useState<Types.Lemma | null>(null);

  const [goBack, handleBack] = useGoBack();

  useEffect(() => {
    const { search } = props.history.location;
    if (search) {
      const matches = decodeURI(search).match(/\bq=(.*)$/);
      if (matches) {
        setSearchTerm(matches[1]);
      }
    }
  }, [props.history.location]);
  const { data: lemmas } = useFetch<Types.Lemma[]>(
    searchTerm ? `/api/search?term=${searchTerm}` : null,
    searchTerm,
  );

  const handleChange = (option: ValueType<WordOption>) => {
    if (option) {
      const { value } = option as WordOption;
      setSearchTerm(value);
      props.history.push(encodeURI(`/search?q=${value}`));
    }
  };

  if (goBack) {
    return <Redirect to="/content" />;
  }

  if (lemma) {
    const [publication, article] = lemma.filename.split('.');
    const url = encodeURI(`/content/${publication}/${article}#${lemma._id}`);
    return <Redirect to={url} />;
  }

  return (
    <WordClickHandler>
      <NavBar
        title={C.SEARCH}
        onBack={handleBack}
        rightHandButtons={<SearchBox onChange={handleChange} />}
        hideSearchButton={true}
      />
      <GridContainer>
        {lemmas && (
          <SearchResultList lemmas={lemmas} onButtonClick={setLemma} />
        )}
      </GridContainer>
    </WordClickHandler>
  );
};

export default withRouter(withStyles(styles)(SearchPage));
