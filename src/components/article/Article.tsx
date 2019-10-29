import { withTheme, WithTheme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Topic } from 'Types';
import ArticleContent from './ArticleContent';
import withNavBar from '../withNavBar';
import WordClickHandler from '../WordClickHandler';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { fetchArticle } from '../../actions/content';
import { RootState } from '../../reducers';

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ fetchArticle }, dispatch);

const mapStateToProps = (state: RootState) => ({
  topic: state.content.article,
  loading: state.content.loading,
  error: state.content.error,
});

interface Params {
  publication: string;
  article: string;
}

type Props = {
  setNavBackRoute: (to: string) => void;
  fetchArticle: (filename: string) => void;
  topic: Topic | null;
  loading: boolean;
  error: any;
} & WithTheme;

const Article: React.FC<Props> = props => {
  const {
    fetchArticle: fetchIt,
    topic,
    loading,
    error,
    setNavBackRoute,
  } = props;
  const { publication, article } = useParams();

  const filename = `${publication}.${article}`;
  const topicLoaded = topic && topic.filename === filename;
  const backTo = `/content/${publication}`;

  useEffect(() => {
    setNavBackRoute(backTo);
    if (!topicLoaded) {
      fetchIt(filename);
    }
  }, [fetchIt, filename, topicLoaded, setNavBackRoute, backTo]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading || !topic) {
    return null;
  }

  return (
    <WordClickHandler>
      <ArticleContent topic={topic} />
    </WordClickHandler>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavBar(withTheme(Article)));
