import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { ILemma } from 'Types';
import { searchLemmas } from '../actions';
import SearchResultList from './SearchResultList';
import WordClickHandler from '../../content/components/WordClickHandler';
import { RootState } from 'typesafe-actions';

const SearchPage: React.FC = () => {
  const dispatch = useDispatch();
  const { lemmas } = useSelector((state: RootState) => state.search);
  const [lemma, setLemma] = useState<ILemma | null>(null);

  const {
    location: { search },
  } = useHistory();

  useEffect(() => {
    if (search) {
      const matches = decodeURI(search).match(/\bq=(.*)$/);
      if (matches) {
        dispatch(searchLemmas(matches[1]));
      }
    }
  }, [dispatch, search]);

  if (lemma) {
    const [publication, article] = lemma.filename.split('.');
    const url = encodeURI(`/content/${publication}/${article}#${lemma._id}`);
    return <Redirect to={url} />;
  }

  return (
    <WordClickHandler>
      {lemmas && <SearchResultList lemmas={lemmas} onButtonClick={setLemma} />}
    </WordClickHandler>
  );
};

export default SearchPage;