import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import Spinner from '../../../layout/components/Spinner';
import { fetchPublicationsAsync } from '../actions';
import PublicationListItem from './PublicationListItem';
import { setTargetLang, openSettings } from '../../settings/actions';
import { Typography } from '@material-ui/core';
import { Redirect } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
  }),
);

const PublicationList: React.FC = () => {
  const dispatch = useDispatch();
  const { targetLang } = useSelector((state: RootState) => state.settings);
  const { publications: topics, loading, error } = useSelector(
    (state: RootState) => state.content,
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const classes = useStyles();

  const publicationsLoaded = topics.length !== 0;

  useEffect(() => {
    if (!publicationsLoaded) {
      dispatch(fetchPublicationsAsync());
    }
  }, [dispatch, publicationsLoaded]);

  useEffect(() => {
    if (!targetLang && topics.length > 0) {
      dispatch(setTargetLang(topics[0].foreignLang));
      dispatch(openSettings());
    }
  }, [topics, targetLang, dispatch]);

  // this isn't an always response, it must be specific.
  if (user?.isSecured === false) {
    return <Redirect to="/password" />;
  }

  if (error) {
    return <Typography variant="h3">{error.message}</Typography>;
  }

  return (
    <React.Fragment>
      {loading && <Spinner />}
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
