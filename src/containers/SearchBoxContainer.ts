import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { searchLemmas } from '../actions/search';
import SearchBox from '../components/SearchBox';
import { RootState } from '../reducers';

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ searchLemmas }, dispatch);

const mapStateToProps = (state: RootState) => ({
  lemmas: state.search.lemmas,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBox);
