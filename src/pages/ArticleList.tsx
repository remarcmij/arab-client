import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Topic } from 'Types';
import ArticleListItem from '../components/ArticleListItem';
import withNavBar from '../components/withNavBar';
import LanguageContext from '../contexts/LanguageContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
  }),
);

type Props = Readonly<{
  setNavBackRoute: (to: string) => void;
  fetchArticles: (publication: string) => void;
  topics: Topic[];
  loading: boolean;
  error: any;
}>;

const ArticleList: React.FC<Props> = props => {
  const classes = useStyles();
  const { fetchArticles, topics, loading, error, setNavBackRoute } = props;
  const { publication } = useParams();

  const topicsLoaded =
    topics.length !== 0 && topics[0].publication === publication;

  useEffect(() => {
    setNavBackRoute('/content');
    if (!topicsLoaded && publication) {
      fetchArticles(publication);
    }
  }, [fetchArticles, publication, topicsLoaded, setNavBackRoute]);

  return (
    <React.Fragment>
      {!loading && topics.length !== 0 && (
        <Paper classes={{ root: classes.root }}>
          {error ? (
            <div>Error: {error.message}</div>
          ) : (
            <LanguageContext.Provider
              value={{ sourceLang: 'nl', targetLang: 'ar' }}
            >
              <List>
                {topics
                  .filter(topic => !topic.filename.endsWith('.index'))
                  .map(topic => (
                    <ArticleListItem
                      key={`${topic.filename}`}
                      publication={topic}
                    />
                  ))}
              </List>
            </LanguageContext.Provider>
          )}
        </Paper>
      )}
    </React.Fragment>
  );
};

export default withNavBar(ArticleList);
