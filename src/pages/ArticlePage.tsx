import { withTheme, WithTheme } from '@material-ui/core/styles';
import React from 'react';
import { match, Redirect } from 'react-router';
import Types from 'Types';
import GridContainer from '../components/GridContainer';
import LemmaArticle from '../components/LemmaArticle';
import NavBar from '../components/NavBar';
import WordClickHandler from '../components/WordClickHandler';
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
  const { publication, article } = props.match.params;

  const [goBack, handleBack] = useGoBack();

  const { data: topic, error } = useFetch<Types.AppDocument>(
    `/api/article/${publication}.${article}`,
  );

  const renderNavBar = () => (
    <NavBar title={topic ? topic.title : ''} onBack={handleBack} />
  );

  const renderContent = () => {
    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (!topic) {
      return null;
    }

    return (
      <React.Fragment>
        <LemmaArticle document={topic} />
      </React.Fragment>
    );
  };

  if (goBack) {
    return <Redirect to={`/content/${publication}`} />;
  }

  return (
    <WordClickHandler>
      {renderNavBar()}
      <GridContainer>{renderContent()}</GridContainer>
    </WordClickHandler>
  );
};

export default withTheme()(ArticlePage);
