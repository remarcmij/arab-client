import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import React, { Suspense, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { loadUser } from './actions/auth';
import Spinner from './components/common/Spinner';
import NavBar from './components/NavBar';
import Routes from './components/routes/Routes';
import Welcome from './pages/welcome/Welcome';
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

// const ProtectedRoute: React.FC<any> = ({ ...props }) => {
//   return getToken() ? <Route {...props} /> : <Redirect to="/login" />;
// };

const App: React.FC<{}> = () => {
  const [cookies, , removeCookie] = useCookies();
  const classes = useStyles();
  const { token } = cookies;
  if (token) {
    storeToken(token);
    removeCookie('token');
  }

  useEffect(() => void store.dispatch(loadUser()), []);

  return (
    <Suspense fallback={<Spinner />}>
      <Provider store={store}>
        <Router>
          <div className={classes.root}>
            <NavBar />
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
