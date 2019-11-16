import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'typesafe-actions';
import useNavBackRoute from '../../../layout/hooks/useNavBackRoute';
import { deleteTopic, fetchTopics } from '../actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(4),
      right: theme.spacing(4),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

const ContentAdmin: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { topics, loading } = useSelector((state: RootState) => state.admin);

  useNavBackRoute('/content');

  useEffect(() => {
    dispatch(fetchTopics());
  }, [dispatch]);

  if (loading) {
    return null;
  }

  return (
    <Grid container={true} justify="center" style={{ position: 'relative' }}>
      <Grid item={true} xs={12} md={8}>
        <Box mt={4}>
          <Paper>
            <List
              subheader={<ListSubheader>{t('manage_content')}</ListSubheader>}
            >
              {topics.map(topic => (
                <ListItem key={topic._id}>
                  <ListItemText
                    primary={topic.title}
                    secondary={topic.filename}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => dispatch(deleteTopic(topic.filename))}
                    >
                      <DeleteForeverIcon color="error" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
              <ListItem>content</ListItem>
            </List>
          </Paper>
          <Fab
            color="primary"
            aria-label="add"
            className={classes.fab}
            component={Link}
            to="/admin/content/upload"
          >
            <AddIcon />
          </Fab>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ContentAdmin;
