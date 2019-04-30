import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import RecordVoiceOver from '@material-ui/icons/RecordVoiceOver';
import VoiceOverOff from '@material-ui/icons/VoiceOverOff';
import * as React from 'react';
import * as S from './strings';

type Props = {
  voiceName: string;
  voiceEnabled: boolean;
  toggleVoice: () => void;
};

const VoiceOverButton: React.FC<Props> = props => {
  const { voiceName, voiceEnabled, toggleVoice } = props;
  if (voiceName === 'none') {
    return null;
  }
  const title = voiceEnabled ? S.DISABLE_VOICE : S.ENABLE_VOICE;
  return (
    <Tooltip title={title} aria-label={title}>
      <IconButton color="inherit" onClick={toggleVoice}>
        {voiceEnabled ? <RecordVoiceOver /> : <VoiceOverOff />}
      </IconButton>
    </Tooltip>
  );
};

export default VoiceOverButton;
