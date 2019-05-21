import Grid from '@material-ui/core/Grid';
import { withTheme, WithTheme } from '@material-ui/core/styles';
import React from 'react';
import { match, Redirect } from 'react-router';
import Types from 'Types';
import * as C from '../components/constants';
import GridContainer from '../components/GridContainer';
import LemmaFlashcards from '../components/LemmaFlashcards';
import NavBar from '../components/NavBar';
import { useSettingsContext } from '../contexts/settings';
import useFetch from '../hooks/useFetch';
import useGoBack from '../hooks/useGoBack';

interface Params {
  publication: string;
  article: string;
}

interface Props extends WithTheme {
  match: match<Params>;
}

const FlashcardPage: React.FC<Props> = props => {
  const { publication, article } = props.match.params;

  const { settings } = useSettingsContext();

  const { showVocalization, voiceName } = settings;

  const [goBack, handleBack] = useGoBack();

  const { data: document } = useFetch<Types.AppDocument>(
    `/api/article/${publication}.${article}`,
  );

  if (goBack) {
    return <Redirect to={`/content/${publication}/${article}`} />;
  }

  return (
    <React.Fragment>
      <NavBar title={C.FLASHCARDS_PAGE_TITLE} onBack={handleBack} />
      {document && (
        <GridContainer>
          <Grid container={true} justify="center">
            <Grid item={true} xs={12} md={10} lg={8}>
              <LemmaFlashcards
                document={document}
                showVocalization={showVocalization}
                voiceName={voiceName}
              />
            </Grid>
          </Grid>
        </GridContainer>
      )}
    </React.Fragment>
  );
};

export default withTheme()(FlashcardPage);
