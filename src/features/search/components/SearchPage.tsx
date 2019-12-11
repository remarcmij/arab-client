import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { ILemma } from 'Types';
import { RootState } from 'typesafe-actions';
import Spinner from '../../../layout/components/Spinner';
import WordClickHandler from '../../content/components/WordClickHandler';
import { searchLemmasAsync } from '../actions';
import SearchResultList from './SearchResultList';

const SearchPage: React.FC = () => {
  const dispatch = useDispatch();
  const { lemmas, loading, error } = useSelector(
    (state: RootState) => state.search,
  );
  const [lemma, setLemma] = useState<ILemma | null>(null);

  const {
    location: { search },
  } = useHistory();

  useEffect(() => {
    if (search) {
      const matches = decodeURI(search).match(/\bq=(.*)$/);
      if (matches) {
        dispatch(searchLemmasAsync(matches[1]));
      }
    }
  }, [dispatch, search]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return null;
  }

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
