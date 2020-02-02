import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120,
    },
  }),
);

type Props = Readonly<{
  language: string;
  languages: string[];
  onChange: (lang: string) => void;
  disabled: boolean;
}>;

const LanguageSelect: React.FC<Props> = props => {
  const { language, languages, onChange, disabled } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useLayoutEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  });

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    onChange(e.target.value as string);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} id="lang-select-label">
        {t('target_language')}
      </InputLabel>
      <Select
        fullWidth={true}
        labelId="lang-select-label"
        value={language}
        onChange={handleChange}
        disabled={disabled}
        labelWidth={labelWidth}
      >
        {languages.map(lang => (
          <MenuItem key={lang} value={lang}>
            {t(lang) || lang}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelect;
