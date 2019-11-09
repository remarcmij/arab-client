import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import Search from '@material-ui/icons/Search';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { setNavBackRoute } from '../actions/navbar';
import { RootState } from '../reducers';
import MainDrawer from './MainDrawer';
import SearchBox from './SearchBox';

const useStyles = makeStyles({
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

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const { navBackRoute } = useSelector((state: RootState) => state.navbar);
  const classes = useStyles();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const history = useHistory();

  const [mainDrawerOpen, setMainDrawerOpen] = useState(false);

  const handleToggleDrawer = () => setMainDrawerOpen(!mainDrawerOpen);

  const handleSearch = () => {
    dispatch(setNavBackRoute(history.location.pathname));
    history.push('/search');
  };

  const handleBack = () => history.push(navBackRoute || '/content');

  if (pathname === '/welcome') {
    return null;
  }

  const onMainPage = pathname === '/content';

  return (
    <AppBar position="fixed">
      <Container maxWidth="md">
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
            {t('app_title')}
          </Typography>
          <Route path="/search" exact={true} render={() => <SearchBox />} />
          <Route
            path="/content"
            render={() => (
              <Tooltip
                title={t('search_tooltip')}
                aria-label={t('search_tooltip')}
              >
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
      </Container>
    </AppBar>
  );
};

export default NavBar;
