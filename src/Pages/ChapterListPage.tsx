import * as React from 'react';
import { match } from 'react-router';
import ChapterList from '../components/ChapterList';
import Fetcher from '../services/Fetcher';

interface IParams {
  publication: string;
  chapter: string;
}

interface IProps {
  match: match<IParams>;
}

interface IState {
  publications: IPublication[];
  loading: boolean;
  error: Error | null;
}

export default class ChapterListPage extends React.Component<IProps, IState> {
  state: IState = {
    publications: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    const { publication, chapter } = this.props.match.params;

    Fetcher.fetchJSON(`${process.env.REACT_APP_API_URL}/${publication}`)
      .then(data => {
        this.setState({
          publications: data,
          loading: false,
          error: null,
        });
      })
      .catch(error => {
        this.setState({ loading: false, error });
      });
  }

  public render() {
    const { loading, error, publications } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return <ChapterList publications={publications} />;
  }
}
