import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import React, { Suspense, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './routes/Routes';
import { loadUserThunk } from './features/auth/actions';
import SettingsDialog from './features/settings/components/SettingsDialog';
import NavBar from './layout/components/NavBar';
import SnackbarContainer from './layout/components/SnackbarContainer';
import Spinner from './layout/components/Spinner';
import Welcome from './layout/components/Welcome';
import store from './store';
import { storeToken } from './utils/token';

// paddingTop emulates the toolbar's minHeight from the default theme
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    paddingTop: 56,
    '@media (min-width:600px)': {
      paddingTop: 64,
    },
  },
});

const App: React.FC<{}> = () => {
  const [cookies, , removeCookie] = useCookies();
  const classes = useStyles();
  const { token } = cookies;
  if (token) {
    storeToken(token);
    removeCookie('token');
  }

  useEffect(() => {
    store.dispatch(loadUserThunk());
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <Provider store={store}>
        <Router>
          <div className={classes.root}>
            <NavBar />
            <SnackbarContainer />
            <SettingsDialog />
            <Container maxWidth="md">
              <Switch>
                <Route exact={true} path="/welcome" component={Welcome} />
                <Route component={Routes} />
              </Switch>
            </Container>
          </div>
        </Router>
      </Provider>
    </Suspense>
  );
};

export default App;
