import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { fetchArticles } from '../actions/content';
import ArticleList from '../pages/ArticleList';
import { RootState } from '../reducers';

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ fetchArticles }, dispatch);

const mapStateToProps = (state: RootState) => ({
  topics: state.content.articles,
  loading: state.content.loading,
  error: state.content.error,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleList);
