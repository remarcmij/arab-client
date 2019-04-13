import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import Types from 'Types';
import GridContainer from '../components/GridContainer';
import NavBar from '../components/NavBar';
import PublicationListItem from '../components/PublicationListItem';
import * as S from '../components/strings';
import useFetch from '../hooks/useFetch';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing.unit,
    },
  });

interface Props extends WithStyles<typeof styles> {}

const PublicationListPage: React.FC<Props> = props => {
  const { classes } = props;

  const { data: documents, error, loading } = useFetch<Types.AppDocument[]>('/api');

  const renderContent = () => {
    if (loading || documents === null) {
      return null;
    }

    if (error) {
      return <p>Error: {error.message}</p>;
    }

    return (
      <List>
        {documents &&
          documents.map(doc => <PublicationListItem key={doc.filename} publication={doc} />)}
      </List>
    );
  };

  return (
    <React.Fragment>
      <NavBar title={S.APP_TITLE} showDrawerButton={true} enableSettingsMenu={true} />
      <GridContainer>
        <Paper classes={{ root: classes.root }}>{renderContent()}</Paper>
      </GridContainer>
    </React.Fragment>
  );
};

export default withStyles(styles)(PublicationListPage);
