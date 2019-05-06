import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import Search from '@material-ui/icons/Search';
import Settings from '@material-ui/icons/Settings';
import React, { useState } from 'react';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import GridContainer from './GridContainer';
import MainDrawer from './MainDrawer';
import * as S from './strings';

const styles = createStyles({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  leftButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

interface OwnProps {
  title: string;
  rightHandButtons?: React.ReactElement<any> | null;
  hideSearchButton?: boolean;
  onBack?: () => void;
  onLeftMenu?: () => void;
  onRightMenu?: () => void;
}

type Props = OwnProps & RouteComponentProps & WithStyles<typeof styles>;

const NavBar: React.FC<Props> = props => {
  const {
    title,
    onBack,
    rightHandButtons = null,
    hideSearchButton = false,
    classes,
    history,
  } = props;

  const [mainDrawerOpen, setMainDrawerOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [goSearch, setGoSearch] = useState(false);

  const handleOpenDialog = () => {
    setSettingsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSettingsDialogOpen(false);
  };

  const handleToggleDrawer = () => {
    setMainDrawerOpen(!mainDrawerOpen);
  };

  const handleSearch = () => {
    setGoSearch(true);
  };

  if (goSearch) {
    let url = '/search';
    const { search } = history.location;
    if (search) {
      url += search;
    }
    return <Redirect to={url} />;
  }

  return (
    <AppBar position="fixed">
      <GridContainer>
        <Toolbar>
          {onBack ? (
            <IconButton
              className={classes.leftButton}
              onClick={onBack}
              color="inherit"
            >
              <ArrowBackIcon />
            </IconButton>
          ) : (
            <IconButton
              className={classes.leftButton}
              onClick={handleToggleDrawer}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {title}
          </Typography>
          {rightHandButtons}
          {!hideSearchButton && (
            <Tooltip title={S.SEARCH} aria-label={S.SEARCH}>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup={true}
                onClick={handleSearch}
                color="inherit"
              >
                <Search />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
        {!onBack && (
          <MainDrawer open={mainDrawerOpen} toggleDrawer={handleToggleDrawer} />
        )}
      </GridContainer>
    </AppBar>
  );
};

export default withRouter(withStyles(styles)(NavBar));
