import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { match, Redirect } from 'react-router';
import Types from 'Types';
import GridContainer from '../components/GridContainer';
import NavBar from '../components/NavBar';
import ArticleListItem from '../components/ArticleListItem';
import * as C from '../components/strings';
import useGoBack from '../hooks/useGoBack';
import LanguageContext from '../contexts/LaunguageContext';
import useFetch from '../hooks/useFetch';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing.unit,
    },
  });

interface IParams {
  publication: string;
  article: string;
}

interface Props extends WithStyles<typeof styles> {
  match: match<IParams>;
}

const ArticleListPage: React.FC<Props> = props => {
  const [goBack, handleBack] = useGoBack();

  const { publication } = props.match.params;
  const { data: documents, error, loading } = useFetch<Types.AppDocument[]>(
    `/api/index/${publication}`,
  );

  return goBack ? (
    <Redirect to="/content" />
  ) : (
    <React.Fragment>
      <NavBar title={C.ARTICLE_LIST_PAGE_TITLE} onBack={handleBack} enableSettingsMenu={true} />
      <GridContainer>
        {!loading && documents !== null && (
          <Paper classes={{ root: props.classes.root }}>
            {error ? (
              <div>Error: {error.message}</div>
            ) : (
              <LanguageContext.Provider value={{ base: 'nl', foreign: 'ar' }}>
                <List>
                  {documents
                    .filter(doc => !doc.filename.endsWith('.index'))
                    .map(doc => (
                      <ArticleListItem key={`${doc.filename}`} publication={doc} />
                    ))}
                </List>
              </LanguageContext.Provider>
            )}
          </Paper>
        )}
      </GridContainer>
    </React.Fragment>
  );
};

export default withStyles(styles)(ArticleListPage);
