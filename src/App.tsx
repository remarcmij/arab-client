import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { loadUser } from './actions/auth';
import GridContainer from './components/GridContainer';
import Routes from './components/routes/Routes';
import NavBarContainer from './containers/NavBarContainer';
import { SettingsProvider } from './contexts/settings';
import { UserProfileProvider } from './contexts/UserProfileProvider';
import Welcome from './pages/welcome/Welcome';
import { RootState } from './reducers';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { getToken } from './utils/storedToken';

// paddingTop emulates the toolbar's minHeight from the default theme
const styles = createStyles({
  root: {
    flexGrow: 1,
    paddingTop: 56,
    '@media (min-width:600px)': {
      paddingTop: 64,
    },
  },
});

type Props = WithStyles<typeof styles>;

// const ProtectedRoute: React.FC<any> = ({ ...props }) => {
//   return getToken() ? <Route {...props} /> : <Redirect to="/login" />;
// };

const token = getToken();
if (token) {
  setAuthToken(token);
}

const App: React.FC<Props> = ({ classes }) => {
  useEffect(() => {
    (store.dispatch as ThunkDispatch<RootState, void, AnyAction>)(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className={classes.root}>
          <UserProfileProvider>
            <SettingsProvider>
              <NavBarContainer />
              <GridContainer>
                <Switch>
                  <Route exact={true} path="/welcome" component={Welcome} />
                  <Route component={Routes} />
                </Switch>
              </GridContainer>
            </SettingsProvider>
          </UserProfileProvider>
        </div>
      </Router>
    </Provider>
  );
};

export default withStyles(styles)(App);
