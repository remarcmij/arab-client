import IconButton from '@material-ui/core/IconButton';
import { withTheme, WithTheme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Code from '@material-ui/icons/Code';
import React, { useState } from 'react';
import MediaQuery from 'react-responsive';
import { match, Redirect } from 'react-router';
import Types from 'Types';
import ArticleTextContent from '../components/ArticleTextContent';
import GridContainer from '../components/GridContainer';
import LemmaList from '../components/LemmaList';
import LemmaTable from '../components/LemmaTable';
import NavBar from '../components/NavBar';
import * as S from '../components/strings';
import VoiceOverButton from '../components/VoiceOverButton';
import useFetch from '../hooks/useFetch';
import useGoBack from '../hooks/useGoBack';
import { useSettingsContext } from '../contexts/SettingsProvider';
import { toggleVoice } from '../contexts/settings-actions';

interface Params {
  publication: string;
  article: string;
}

interface Props extends WithTheme {
  match: match<Params>;
}

const ArticlePage: React.FC<Props> = props => {
  const { settings, dispatch } = useSettingsContext();

  const {
    showVocalization,
    showTranscription,
    romanizationStandard,
    voiceName,
    voiceEnabled,
  } = settings;

  const { publication, article } = props.match.params;

  const [goFlashcards, setGoFlashcards] = useState<boolean>(false);
  const [goBack, handleBack] = useGoBack();

  const onGoFlashcards = () => setGoFlashcards(true);

  const { data: document, error } = useFetch<Types.AppDocument>(
    `/api/article/${publication}.${article}`,
  );

  const renderNavBar = () => (
    <NavBar
      title={S.ARTICLE_PAGE_TITLE}
      onBack={handleBack}
      enableSettingsMenu={true}
      rightHandButtons={
        document === null || document.kind !== 'wordlist' ? null : (
          <React.Fragment>
            <VoiceOverButton
              voiceEnabled={voiceEnabled}
              voiceName={voiceName}
              toggleVoice={() => dispatch(toggleVoice())}
            />
            <Tooltip title={S.FLASHCARDS_PAGE_TITLE} aria-label={S.FLASHCARDS_PAGE_TITLE}>
              <IconButton color="inherit" onClick={onGoFlashcards}>
                <Code />
              </IconButton>
            </Tooltip>
          </React.Fragment>
        )
      }
    />
  );

  const renderContent = () => {
    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (!document) {
      return null;
    }

    if (document.kind === 'wordlist') {
      return (
        <React.Fragment>
          <MediaQuery query={`(min-device-width: ${props.theme.breakpoints.values.sm + 1}px)`}>
            <LemmaTable
              document={document}
              showVocalization={showVocalization}
              showTranscription={showTranscription}
              romanizationStandard={romanizationStandard}
              voiceName={voiceName}
              voiceEnabled={voiceEnabled}
            />
          </MediaQuery>
          <MediaQuery query={`(max-device-width: ${props.theme.breakpoints.values.sm}px)`}>
            <LemmaList
              document={document}
              showVocalization={showVocalization}
              showTranscription={showTranscription}
              romanizationStandard={romanizationStandard}
              voiceName={voiceName}
              voiceEnabled={voiceEnabled}
            />
          </MediaQuery>
        </React.Fragment>
      );
    }

    if (document.kind === 'text') {
      return <ArticleTextContent document={document} />;
    }
  };

  if (goBack) {
    return <Redirect to={`/content/${publication}`} />;
  }

  if (goFlashcards) {
    return <Redirect to={`/content/${publication}/${article}/flashcards`} />;
  }

  return (
    <React.Fragment>
      {renderNavBar()}
      <GridContainer>{renderContent()}</GridContainer>
    </React.Fragment>
  );
};

export default withTheme()(ArticlePage);
