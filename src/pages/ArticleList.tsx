import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchArticles } from '../actions/content';
import ArticleListItem from '../components/ArticleListItem';
import useNavBackRoute from '../components/useNavBackRoute';
import LanguageContext from '../contexts/LanguageContext';
import { RootState } from '../reducers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
  }),
);

const ArticleList: React.FC = () => {
  const dispatch = useDispatch();
  const { articles: topics, loading, error } = useSelector(
    (state: RootState) => state.content,
  );
  const classes = useStyles();
  const { publication } = useParams();

  const topicsLoaded =
    topics.length !== 0 && topics[0].publication === publication;

  useNavBackRoute('/content');
  useEffect(() => {
    if (!topicsLoaded && publication) {
      dispatch(fetchArticles(publication));
    }
  }, [dispatch, publication, topicsLoaded]);

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

export default ArticleList;
