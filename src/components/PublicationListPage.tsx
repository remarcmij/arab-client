import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import Types from 'Types';
import GridContainer from '../components/GridContainer';
import NavBar from '../components/NavBar';
import PublicationListItem from './PublicationListItem';
import * as S from './strings';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing.unit,
    },
  });

interface Props extends WithStyles<typeof styles> {
  documents: Types.AppDocument[];
  isLoading: boolean;
  error: Error | null;
  fetchPublicationList: () => void;
}

const PublicationListPage: React.FC<Props> = props => {
  const { isLoading, error, documents, classes } = props;

  useEffect(() => {
    props.fetchPublicationList();
  }, []);

  const renderContent = () => {
    // if (isLoading) {
    //   return <p>Loading...</p>
    // }

    if (error) {
      return <p>Error: {error.message}</p>;
    }

    return (
      <List>
        {documents.map(doc => (
          <PublicationListItem key={doc.filename} publication={doc} />
        ))}
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
