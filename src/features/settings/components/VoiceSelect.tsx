import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { IVoiceInfo } from '../actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120,
    },
  }),
);

type Props = Readonly<{
  label: string;
  voices: IVoiceInfo[];
  selectedVoice?: IVoiceInfo;
  setSelectedVoice: (voice: IVoiceInfo) => void;
}>;

const VoiceSelect: React.FC<Props> = props => {
  const { label, voices, selectedVoice, setSelectedVoice } = props;
  const classes = useStyles();

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useLayoutEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  });

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedVoice(voices.find(voice => voice.name === event.target.value)!);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} id={`voice-${label}-label`}>
        {label}
      </InputLabel>
      <Select
        fullWidth={true}
        labelId={`voice-${label}-label`}
        value={selectedVoice?.name}
        onChange={handleChange}
        labelWidth={labelWidth}
      >
        {voices.map(voice => (
          <MenuItem key={voice.name} value={voice.name}>
            {voice.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default VoiceSelect;
