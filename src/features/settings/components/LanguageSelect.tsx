import React, { useEffect, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { ITopic } from 'Types';
import { useTranslation } from 'react-i18next';

type Props = {
  lang: string | null;
  onChange: (lang: string) => void;
  topics: ITopic[];
};

const LanguageSelect: React.FC<Props> = props => {
  const { lang, onChange, topics } = props;
  const [languages, setLanguages] = useState<string[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    setLanguages(
      Array.from(
        topics.reduce((acc, topic) => {
          acc.add(topic.foreignLang);
          return acc;
        }, new Set<string>()),
      ),
    );
  }, [topics]);

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    onChange(e.target.value as string);
  };

  return (
    <React.Fragment>
      <InputLabel htmlFor="language-select">Foreign Language</InputLabel>
      <Select
        native={true}
        fullWidth={true}
        value={lang ?? ''}
        onChange={handleChange}
        inputProps={{ id: 'language-select' }}
      >
        <option value="" />
        {languages.map(lang => (
          <option key={lang} value={lang}>
            {t(lang) || lang}
          </option>
        ))}
      </Select>
    </React.Fragment>
  );
};

export default LanguageSelect;
