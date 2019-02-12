import React, { Component } from 'react';
import Fetcher from '../services/Fetcher';
import Flashcard from './Flashcard';

interface State {
  lemmas: Lemma[];
}

export default class FlashcardController extends Component<{}, State> {
  state: State = {
    lemmas: [],
  };

  async componentDidMount() {
    const lemmas = await Fetcher.fetchCsv('/lessons/lesson_6/werkwoorden.csv');
    this.setState({ lemmas });
    const doc = await Fetcher.fetchYml('/lessons/index.yml');
    console.log('doc :', doc);
  }

  renderLemmas() {
    const { lemmas } = this.state;
    return lemmas.map((lemma, index) => (
      <li key={index}>
        <Flashcard lemma={lemma} />
      </li>
    ));
  }

  render() {
    return <ul>{this.renderLemmas()}</ul>;
  }
}
