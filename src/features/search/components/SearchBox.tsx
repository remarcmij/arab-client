import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';
import latinize from 'latinize';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ActionMeta, OptionTypeBase, ValueType } from 'react-select';
import AsyncSelect from 'react-select/async';
import { searchLemmasThunk } from '../actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      width: 200,
      color: theme.palette.text.primary,
    },
  }),
);

interface ILookupResponse {
  words: Array<{ word: string; lang: string }>;
  term: string;
}

const promiseOptions = (input: string) => {
  if (!input) {
    return Promise.resolve([]);
  }

  return axios
    .get<ILookupResponse>(`/api/lookup?term=${input}`)
    .then(({ data }) => {
      const options = data.words.map(word => ({
        value: word.word,
        label: word.word,
      }));
      return options;
    })
    .catch(err => {
      console.error(err);
      return [];
    });
};

const SearchBox: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [isRtl, setIsRtl] = useState(false);

  const handleInputChange = useCallback(
    (value: string) => {
      value = value.trim();
      if (/[\u0600-\u06ff]+/.test(value)) {
        setIsRtl(true);
        value = value.replace(/[^\u0621-\u064a]/g, '');
      } else {
        setIsRtl(false);
        value = latinize(value.toLowerCase());
      }
      setInputValue(value);
    },
    [setIsRtl],
  );

  const handleChange = useCallback(
    (option: ValueType<OptionTypeBase>, action: ActionMeta) => {
      if (action.action === 'select-option') {
        const { value } = option as OptionTypeBase;
        dispatch(searchLemmasThunk(value));
      }
    },
    [dispatch],
  );

  return (
    <AsyncSelect
      placeholder={t('search_placeholder')}
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
