import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublications } from '../actions/content';
import PublicationListItem from '../components/PublicationListItem';
import withNavbar from '../components/withNavBar';
import { RootState } from '../reducers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
  }),
);

const PublicationList: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { publications: topics, loading, error } = useSelector(
    (state: RootState) => state.content,
  );
  const classes = useStyles();

  const publicationsLoaded = topics.length !== 0;

  useEffect(() => {
    if (!publicationsLoaded) {
      dispatch(fetchPublications());
    }
  }, [dispatch, publicationsLoaded]);

  if (loading) {
    return null;
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

export default withNavbar(PublicationList);
