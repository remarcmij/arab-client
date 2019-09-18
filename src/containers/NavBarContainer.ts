import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { setNavBackRoute } from '../actions/navbar';
import NavBar from '../components/NavBar';
import { RootState } from '../reducers';

const mapStateToProps = (state: RootState) => ({
  navBackRoute: state.navbar.navBackRoute,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ setNavBackRoute }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
