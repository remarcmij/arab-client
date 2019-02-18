import * as React from 'react';

interface Props {
  lemmas: ILemma[];
}

export default class WordList extends React.Component<Props> {
  public render() {
    return <ul>{this.renderWords()}</ul>;
  }

  private renderWords() {
    const { lemmas } = this.props;
    return lemmas.map((lemma, index) => (
      <li key={index}>
        <span>{lemma.base}</span>
        {', '}
        <span dir="rtl">{lemma.foreign}</span>
        {', '}
        <span>{lemma.trans}</span>
      </li>
    ));
  }
}
