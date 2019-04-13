import { withTheme, WithTheme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { match, Redirect } from 'react-router';
import Types from 'Types';
import GridContainer from '../components/GridContainer';
import LemmaFlashcards from '../components/LemmaFlashcards';
import NavBar from '../components/NavBar';
import * as S from '../components/strings';
import VoiceOverButton from '../components/VoiceOverButton';
import Grid from '@material-ui/core/Grid';
import useGoBack from '../hooks/useGoBack';
import useFetch from '../hooks/useFetch';
import { useSettingsContext } from '../stores/settings/SettingsStore';
import * as actions from '../stores/settings/actions';

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

  const toggleVoice = () => dispatch(actions.toggleVoice());

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
            toggleVoice={toggleVoice}
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
