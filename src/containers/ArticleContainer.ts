import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { fetchArticle } from '../actions/content';
import Article from '../pages/Article';
import { RootState } from '../reducers';

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ fetchArticle }, dispatch);

const mapStateToProps = (state: RootState) => ({
  topic: state.content.article,
  loading: state.content.loading,
  error: state.content.error,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Article);
