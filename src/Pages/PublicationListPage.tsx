import * as React from 'react';
import { match } from 'react-router';
import PublicationList from '../components/PublicationList';
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

export default class PublicationListPage extends React.Component<IProps, IState> {
  state: IState = {
    publications: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    Fetcher.fetchJSON(`${process.env.REACT_APP_API_URL}`)
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
    return <PublicationList publications={this.state.publications} />;
  }
}
