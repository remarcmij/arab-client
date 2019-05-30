import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import Search from '@material-ui/icons/Search';
import React, { useState } from 'react';
import { Route, RouteComponentProps, withRouter } from 'react-router';
import * as C from '../constants';
import SearchBoxContainer from '../containers/SearchBoxContainer';
import GridContainer from './GridContainer';
import MainDrawer from './MainDrawer';

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
  rightHandButtons?: React.ReactElement<any> | null;
  hideSearchButton?: boolean;
  navBackRoute: string | null;
  setNavBackRoute: (path: string) => void;
  onLeftMenu?: () => void;
  onRightMenu?: () => void;
}

type Props = OwnProps & RouteComponentProps & WithStyles<typeof styles>;

const NavBar: React.FC<Props> = props => {
  const {
    classes,
    location: { pathname },
  } = props;

  const [mainDrawerOpen, setMainDrawerOpen] = useState(false);

  const handleToggleDrawer = () => setMainDrawerOpen(!mainDrawerOpen);

  const handleSearch = () => {
    props.setNavBackRoute(props.history.location.pathname);
    props.history.push('/search');
  };

  const handleBack = () => props.history.push(props.navBackRoute || '/content');

  if (pathname === '/welcome') {
    return null;
  }

  const onMainPage = pathname === '/content';

  return (
    <AppBar position="fixed">
      <GridContainer>
        <Toolbar>
          {onMainPage ? (
            <IconButton
              className={classes.leftButton}
              onClick={handleToggleDrawer}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton
              className={classes.leftButton}
              onClick={handleBack}
              color="inherit"
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {C.APP_TITLE}
          </Typography>
          <Route
            path="/search"
            exact={true}
            render={() => <SearchBoxContainer onChange={() => undefined} />}
          />
          <Route
            path="/content"
            render={() => (
              <Tooltip title={C.SEARCH} aria-label={C.SEARCH}>
                <IconButton onClick={handleSearch} color="inherit">
                  <Search />
                </IconButton>
              </Tooltip>
            )}
          />
        </Toolbar>
        {onMainPage && (
          <MainDrawer open={mainDrawerOpen} toggleDrawer={handleToggleDrawer} />
        )}
      </GridContainer>
    </AppBar>
  );
};

export default withRouter(withStyles(styles)(NavBar));
