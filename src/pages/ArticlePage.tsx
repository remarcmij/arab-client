import IconButton from '@material-ui/core/IconButton';
import { withTheme, WithTheme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Code from '@material-ui/icons/Code';
import React, { useState } from 'react';
import MediaQuery from 'react-responsive';
import { match, Redirect } from 'react-router';
import Types from 'Types';
import ArticleTextContent from '../components/ArticleTextContent';
import * as C from '../components/constants';
import GridContainer from '../components/GridContainer';
import LemmaArticle from '../components/LemmaArticle';
import LemmaList from '../components/LemmaList';
import NavBar from '../components/NavBar';
import WordClickHandler from '../components/WordClickHandler';
import { useSettingsContext } from '../contexts/settings';
import useFetch from '../hooks/useFetch';
import useGoBack from '../hooks/useGoBack';

interface Params {
  publication: string;
  article: string;
}

interface OwnProps {
  match: match<Params>;
}

type Props = OwnProps & WithTheme;

const ArticlePage: React.FC<Props> = props => {
  const { settings } = useSettingsContext();

  const {
    showVocalization,
    showTranscription,
    romanizationStandard,
    voiceName,
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
      title={document ? document.title : ''}
      onBack={handleBack}
      rightHandButtons={
        document === null || document.kind !== 'lemmas' ? null : (
          <React.Fragment>
            <Tooltip
              title={C.FLASHCARDS_PAGE_TITLE}
              aria-label={C.FLASHCARDS_PAGE_TITLE}
            >
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

    if (document.kind === 'lemmas') {
      return (
        <React.Fragment>
          <MediaQuery
            query={`(min-device-width: ${props.theme.breakpoints.values.sm +
              1}px)`}
          >
            <LemmaArticle document={document} />
          </MediaQuery>
          <MediaQuery
            query={`(max-device-width: ${props.theme.breakpoints.values.sm}px)`}
          >
            <LemmaList
              document={document}
              showVocalization={showVocalization}
              showTranscription={showTranscription}
              romanizationStandard={romanizationStandard}
              voiceName={voiceName}
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
    <WordClickHandler>
      {renderNavBar()}
      <GridContainer>{renderContent()}</GridContainer>
    </WordClickHandler>
  );
};

export default withTheme()(ArticlePage);
