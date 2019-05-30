import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { fetchPublications } from '../actions/content';
import PublicationList from '../pages/PublicationList';
import { RootState } from '../reducers';

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ fetchPublications }, dispatch);

const mapStateToProps = (state: RootState) => ({
  topics: state.content.publications,
  loading: state.content.loading,
  error: state.content.error,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PublicationList);
