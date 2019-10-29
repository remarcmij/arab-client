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
import { Route, useHistory, useLocation } from 'react-router-dom';
import SearchBoxContainer from '../containers/SearchBoxContainer';
import MainDrawer from './MainDrawer';

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

type Props = Readonly<{
  rightHandButtons?: React.ReactElement<any> | null;
  hideSearchButton?: boolean;
  navBackRoute: string | null;
  setNavBackRoute: (path: string) => void;
  onLeftMenu?: () => void;
  onRightMenu?: () => void;
}>;

const NavBar: React.FC<Props> = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const history = useHistory();

  const [mainDrawerOpen, setMainDrawerOpen] = useState(false);

  const handleToggleDrawer = () => setMainDrawerOpen(!mainDrawerOpen);

  const handleSearch = () => {
    props.setNavBackRoute(history.location.pathname);
    history.push('/search');
  };

  const handleBack = () => history.push(props.navBackRoute || '/content');

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
          <Route
            path="/search"
            exact={true}
            render={() => <SearchBoxContainer onChange={() => undefined} />}
          />
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
