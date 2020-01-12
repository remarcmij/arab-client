import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import Spinner from '../../../layout/components/Spinner';
import { fetchPublicationsAsync } from '../actions';
import PublicationListItem from './PublicationListItem';
import LanguageDialog from '../../settings/components/LanguageDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
  }),
);

const PublicationList: React.FC = () => {
  const dispatch = useDispatch();
  const {
    settings: { targetLang },
    content: { publications: topics, loading, error },
  } = useSelector((state: RootState) => state);
  const classes = useStyles();

  const publicationsLoaded = topics.length !== 0;

  useEffect(() => {
    if (!publicationsLoaded) {
      dispatch(fetchPublicationsAsync());
    }
  }, [dispatch, publicationsLoaded]);

  return (
    <React.Fragment>
      {loading && <Spinner />}
      <LanguageDialog />
      {publicationsLoaded && targetLang != null && (
        <Paper classes={{ root: classes.root }}>
          <List>
            {topics
              .filter(topic => topic.foreignLang === targetLang)
              .map(topic => (
                <PublicationListItem key={topic.filename} publication={topic} />
              ))}
          </List>
        </Paper>
      )}
    </React.Fragment>
  );
};

export default PublicationList;
