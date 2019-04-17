import Grid from '@material-ui/core/Grid';
import { withTheme, WithTheme } from '@material-ui/core/styles';
import React from 'react';
import { match, Redirect } from 'react-router';
import Types from 'Types';
import GridContainer from '../components/GridContainer';
import LemmaFlashcards from '../components/LemmaFlashcards';
import NavBar from '../components/NavBar';
import * as S from '../components/strings';
import VoiceOverButton from '../components/VoiceOverButton';
import useFetch from '../hooks/useFetch';
import useGoBack from '../hooks/useGoBack';
import { useSettingsContext } from '../contexts/settings';
import { toggleVoice } from '../contexts/settings/actions';

interface Params {
  publication: string;
  article: string;
}

interface Props extends WithTheme {
  match: match<Params>;
}

const FlashcardPage: React.FC<Props> = props => {
  const { publication, article } = props.match.params;

  const { settings, dispatch } = useSettingsContext();

  const { showVocalization, voiceName, voiceEnabled } = settings;

  const [goBack, handleBack] = useGoBack();

  const { data: document, error } = useFetch<Types.LemmaDocument>(
    `/api/article/${publication}.${article}`,
  );

  if (goBack) {
    return <Redirect to={`/content/${publication}/${article}`} />;
  }

  return (
    <React.Fragment>
      <NavBar
        title={S.FLASHCARDS_PAGE_TITLE}
        onBack={handleBack}
        enableSettingsMenu={true}
        rightHandButtons={
          <VoiceOverButton
            voiceEnabled={voiceEnabled}
            voiceName={voiceName}
            toggleVoice={() => dispatch(toggleVoice())}
          />
        }
      />
      {document && (
        <GridContainer>
          <Grid container={true} justify="center">
            <Grid item={true} xs={12} md={10} lg={8}>
              <LemmaFlashcards
                document={document}
                showVocalization={showVocalization}
                voiceEnabled={voiceEnabled}
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
