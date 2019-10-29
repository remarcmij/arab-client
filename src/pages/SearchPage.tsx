import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Lemma } from 'Types';
import SearchResultList from '../components/SearchResultList';
import withNavBar from '../components/withNavBar';
import WordClickHandler from '../components/WordClickHandler';

type Props = Readonly<{
  lemmas: Lemma[];
  searchLemmas: (term: string) => void;
  setNavBackRoute: (to: string) => void;
}>;

const SearchPage: React.FC<Props> = props => {
  const [lemma, setLemma] = useState<Lemma | null>(null);

  const { searchLemmas } = props;

  const {
    location: { search },
  } = useHistory();

  useEffect(() => {
    if (search) {
      const matches = decodeURI(search).match(/\bq=(.*)$/);
      if (matches) {
        searchLemmas(matches[1]);
      }
    }
  }, [searchLemmas, search]);

  if (lemma) {
    const [publication, article] = lemma.filename.split('.');
    const url = encodeURI(`/content/${publication}/${article}#${lemma._id}`);
    return <Redirect to={url} />;
  }

  return (
    <WordClickHandler>
      {props.lemmas && (
        <SearchResultList lemmas={props.lemmas} onButtonClick={setLemma} />
      )}
    </WordClickHandler>
  );
};

export default withNavBar(SearchPage);
