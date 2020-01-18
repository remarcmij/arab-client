import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import Spinner from '../../../layout/components/Spinner';
import { fetchPublicationsAsync } from '../actions';
import PublicationListItem from './PublicationListItem';
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

  if (loading) {
    return <Spinner />;
  }

  // this isn't an always response, it must be specific.
  if (user?.isSecured === false) {
    return <Redirect to="/password" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Paper classes={{ root: classes.root }}>
      <List>
        {topics.map(topic => (
          <PublicationListItem key={topic.filename} publication={topic} />
        ))}
      </List>
    </Paper>
  );
};

export default PublicationList;
