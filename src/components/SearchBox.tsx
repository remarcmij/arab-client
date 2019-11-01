import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';
import latinize from 'latinize';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AsyncSelect from 'react-select/async';
import { ValueType } from 'react-select/lib/types';
import { searchLemmas } from '../actions/search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      width: 200,
      color: theme.palette.text.primary,
    },
  }),
);

interface WordDef {
  word: string;
  lang: string;
}

export interface WordOption {
  value: string;
  label: string;
}

type Props = Readonly<{
  onChange: (option: ValueType<WordOption>) => void;
}>;

interface LookupResponse {
  words: WordDef[];
  term: string;
}

const promiseOptions = (input: string) => {
  if (!input) {
    return Promise.resolve([]);
  }

  return axios
    .get<LookupResponse>(`/api/lookup?term=${input}`)
    .then(({ data }) => {
      const options = data.words.map(word => ({
        value: word.word,
        label: word.word,
      }));
      return options;
    })
    .catch(err => {
      console.log(err);
      return [];
    });
};

const SearchBox: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [isRtl, setIsRtl] = useState(false);

  const handleInputChange = (value: string) => {
    value = value.trim();
    if (/[\u0600-\u06ff]+/.test(value)) {
      setIsRtl(true);
      value = value.replace(/[^\u0621-\u064a]/g, '');
    } else {
      setIsRtl(false);
      value = latinize(value.toLowerCase());
    }
    setInputValue(value);
  };

  const handleChange = (option: ValueType<WordOption>) => {
    if (option) {
      const { value } = option as WordOption;
      dispatch(searchLemmas(value));
    }
  };

  return (
    <AsyncSelect
      placeholder="Zoek..."
      cacheOptions={true}
      loadOptions={promiseOptions}
      className={classes.select}
      onChange={handleChange}
      onInputChange={handleInputChange}
      inputValue={inputValue}
      isRtl={isRtl}
      autoFocus={true}
    />
  );
};

export default SearchBox;
