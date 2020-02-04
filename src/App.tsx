import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, { Suspense, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RootState } from 'typesafe-actions';
import { loadUserAsync } from './features/auth/actions';
import SettingsDialog from './features/settings/components/SettingsDialog';
import NavBar from './layout/components/NavBar';
import SnackbarContainer from './layout/components/SnackbarContainer';
import Spinner from './layout/components/Spinner';
import Welcome from './layout/components/Welcome';
import Routes from './routes/Routes';
import { storeToken } from './utils/token';

// paddingTop emulates the toolbar's minHeight from the default theme
const useStyles = makeStyles({
  container: {
    padding: 0,
  },
});

const App: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { settingsOpen } = useSelector((state: RootState) => state.settings);
  const [cookies, , removeCookie] = useCookies();
  const hasMinWidth = useMediaQuery('(min-width:600px)');
  const classes = useStyles();
  const { token } = cookies;
  if (token) {
    storeToken(token);
    removeCookie('token');
  }

  useEffect(() => {
    dispatch(loadUserAsync());
  }, [dispatch]);

  return (
    <Suspense fallback={<Spinner />}>
      <Router>
        <Box flexGrow={1} pt={hasMinWidth ? 8 : 7}>
          <NavBar />
          <SnackbarContainer />
          <Container maxWidth="md" classes={{ root: classes.container }}>
            <Switch>
              <Route exact={true} path="/welcome" component={Welcome} />
              <Route component={Routes} />
            </Switch>
          </Container>
        </Box>
        {settingsOpen && <SettingsDialog />}
      </Router>
    </Suspense>
  );
};

export default App;
