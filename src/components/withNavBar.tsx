import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { setNavBackRoute } from '../actions/navbar';
import { RootState } from '../reducers';

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ setNavBackRoute }, dispatch);

const mapStateToProps = (state: RootState) => ({
  navBackRoute: state.navbar.navBackRoute,
});

export default (WrappedComponent: any) =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(WrappedComponent);
