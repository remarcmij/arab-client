import * as React from 'react';
import { match } from 'react-router';
import LemmaList from '../components/LemmaList';
import Fetcher from '../services/Fetcher';

interface IParams {
  publication: string;
  chapter: string;
}

interface IProps {
  match: match<IParams>;
}

interface IState {
  lemmas: ILemma[];
  loading: boolean;
  error: Error | null;
}

export default class WordListPage extends React.Component<IProps, IState> {
  state: IState = {
    lemmas: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    const { publication, chapter } = this.props.match.params;

    Fetcher.fetchJSON(`${process.env.REACT_APP_API_URL}/${publication}/${chapter}`)
      .then(doc => {
        this.setState({
          lemmas: doc.data,
          loading: false,
          error: null,
        });
      })
      .catch(error => {
        this.setState({ loading: false, error });
      });
  }

  public render() {
    const { loading, error, lemmas } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return <LemmaList lemmas={lemmas} />;
  }
}
