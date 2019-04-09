import { withTheme, WithTheme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { match, Redirect } from 'react-router';
import Types from 'Types';
import GridContainer from './GridContainer';
import LemmaFlashcards from './LemmaFlashcards';
import NavBar from './NavBar';
import * as S from './strings';
import VoiceOverButton from './VoiceOverButton';
import Grid from '@material-ui/core/Grid';
import useGoBack from './useGoBack';

interface Params {
  publication: string;
  article: string;
}

interface Props extends WithTheme {
  match: match<Params>;
  isLoading: boolean;
  error: Error | null;
  document: Types.LemmaDocument;
  showVocalization: boolean;
  showTranscription: boolean;
  romanizationStandard: string;
  voiceEnabled: boolean;
  voiceName: string;
  fetchArticle: (publication: string, article: string) => void;
  toggleVoice: () => void;
}

const FlashcardPage: React.FC<Props> = props => {
  const { document, showVocalization, voiceEnabled, voiceName, toggleVoice } = props;
  const { publication, article } = props.match.params;

  const [goBack, handleBack] = useGoBack();

  useEffect(() => {
    if (!props.document) {
      props.fetchArticle(publication, article);
    }
  }, []);

  if (goBack) {
    return <Redirect to={`/content/${publication}/${article}`} />;
  }

  if (!document) {
    return null;
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
    </React.Fragment>
  );
};

export default withTheme()(FlashcardPage);
