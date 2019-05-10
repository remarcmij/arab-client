import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import axios from 'axios';
import latinize from 'latinize';
import React, { useState } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import { ValueType } from 'react-select/lib/types';
import color from '@material-ui/core/colors/red';
import { getToken } from '../services/token-service';

const styles = (theme: Theme) =>
  createStyles({
    select: {
      width: 200,
      color: theme.palette.text.primary,
    },
  });

interface WordDef {
  text: string;
  lang: string;
}

export interface WordOption {
  value: string;
  label: string;
}

interface OwnProps {
  onChange: (option: ValueType<WordOption>) => void;
}

type Props = WithStyles<typeof styles> & OwnProps;

interface LookupResponse {
  words: WordDef[];
  term: string;
}

const promiseOptions = (input: string) => {
  const token = getToken();
  if (!input || !token) {
    return Promise.resolve([]);
  }

  const headers = { Authorization: `Bearer ${token}` };

  return axios
    .get<LookupResponse>(`/api/lookup?term=${input}`, { headers })
    .then(({ data }) => {
      const options = data.words.map(word => ({
        value: word.text,
        label: word.text,
      }));
      return options;
    })
    .catch(err => {
      console.log(err);
      return [];
    });
};

const SearchBox: React.FC<Props> = props => {
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

  return (
    <AsyncSelect
      placeholder="Zoek..."
      cacheOptions={true}
      loadOptions={promiseOptions}
      className={props.classes.select}
      onChange={props.onChange}
      onInputChange={handleInputChange}
      inputValue={inputValue}
      isRtl={isRtl}
      autoFocus={true}
    />
  );
};

export default withStyles(styles)(SearchBox);
