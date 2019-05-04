import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import AsyncSelect from 'react-select/lib/Async';
import { ValueType } from 'react-select/lib/types';

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
  onChange: (option: ValueType<WordOption>, _: any) => void;
}

type Props = WithStyles<typeof styles> & OwnProps;

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
  return (
    <AsyncSelect
      placeholder="Zoek..."
      cacheOptions={true}
      loadOptions={promiseOptions}
      className={props.classes.select}
      onChange={props.onChange}
      autoFocus={true}
    />
  );
};

export default withStyles(styles)(SearchBox);
