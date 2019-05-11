import Paper from '@material-ui/core/Paper';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import { ValueType } from 'react-select/lib/types';
import Types from 'Types';
import GridContainer from '../components/GridContainer';
import LemmaTable from '../components/LemmaTable';
import NavBar from '../components/NavBar';
import SearchBox, { WordOption } from '../components/SearchBox';
import useFetch from '../hooks/useFetch';
import useGoBack from '../hooks/useGoBack';
import * as S from '../components/strings';

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
  const { classes, history } = props;

  const [selectedWord, setSelectedWord] = useState('');
  const [lemma, setLemma] = useState<Types.Lemma | null>(null);

  const [goBack, handleBack] = useGoBack();

  useEffect(() => {
    const { search } = history.location;
    if (search) {
      const matches = decodeURI(search).match(/\bq=(.*)$/);
      if (matches) {
        setSelectedWord(matches[1]);
      }
    }
  }, []);

  const { data: lemmas, error, loading } = useFetch<Types.Lemma[]>(
    selectedWord ? `/api/search?term=${selectedWord}` : null,
    [selectedWord],
  );

  const handleChange = (option: ValueType<WordOption>) => {
    if (option && !Array.isArray(option)) {
      setSelectedWord(option.value);
      props.history.push(encodeURI(`/search?q=${option.value}`));
    }
  };

  if (goBack) {
    return <Redirect to="/content" />;
  }

  if (lemma) {
    const [publication, article] = lemma.filename.split('.');
    const url = encodeURI(
      `/content/${publication}/${article}?id=${lemma._id}&q=${selectedWord}`,
    );
    return <Redirect to={url} />;
  }

  return (
    <React.Fragment>
      <NavBar
        title={S.SEARCH}
        onBack={handleBack}
        rightHandButtons={<SearchBox onChange={handleChange} />}
        hideSearchButton={true}
      />
      <GridContainer>
        {lemmas && (
          <Paper className={classes.root}>
            <LemmaTable
              lemmas={lemmas}
              onButtonClick={setLemma}
              showButtons={true}
            />
          </Paper>
        )}
      </GridContainer>
    </React.Fragment>
  );
};

export default withRouter(withStyles(styles)(SearchPage));
