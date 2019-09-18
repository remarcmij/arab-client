import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { Topic } from 'Types';
import PublicationListItem from '../components/PublicationListItem';
import withNavbar from '../components/withNavBar';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
  });

type OwnProps = {
  fetchPublications: () => void;
  topics: Topic[];
  loading: boolean;
  error: any;
};

type Props = OwnProps & WithStyles<typeof styles>;

const PublicationList: React.FC<Props> = props => {
  const { classes } = props;

  const { fetchPublications, topics, loading, error } = props;

  const publicationsLoaded = topics.length !== 0;

  useEffect(() => {
    if (!publicationsLoaded) {
      fetchPublications();
    }
  }, [fetchPublications, publicationsLoaded]);

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

export default withNavbar(withStyles(styles)(PublicationList));
