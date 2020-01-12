import React from 'react';
import { IVoiceInfo } from '../actions';
import VoiceList from './VoiceList';

type Props = {
  selected: IVoiceInfo[];
  nonSelected: IVoiceInfo[];
};

const VoiceLists: React.FC<Props> = props => {
  const { selected, nonSelected } = props;

  return (
    <React.Fragment>
      <VoiceList voices={selected} />
      <VoiceList voices={nonSelected} />
    </React.Fragment>
  );
};

export default VoiceLists;
