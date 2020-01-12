import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import PublishIcon from '@material-ui/icons/Publish';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IVoiceInfo } from '../actions';

type Props = {
  voices: IVoiceInfo[];
  draggable?: boolean;
};

const VoiceList: React.FC<Props> = props => {
  const { voices, draggable = false } = props;
  const { t } = useTranslation();

  const onDragStart = (e: any, index: number) => {
    console.log('drag start');
  };

  const onDragOver = (e: any, index: number) => {
    console.log('drag over');
  };

  const onDragEnd = () => {
    console.log('drag end');
  };

  const onButtonClick = (index: number) => {
    console.log('clicked', index);
  };

  return (
    <List
      subheader={
        <ListSubheader component="div">{t('preferred_voices')}</ListSubheader>
      }
    >
      {voices.map((voice, index) => {
        return (
          <ListItem key={voice.name} onDragOver={e => onDragOver(e, index)}>
            <div
              draggable={draggable}
              onDragStart={e => onDragStart(e, index)}
              onDragEnd={onDragEnd}
              style={{ cursor: 'grab' }}
            >
              <ListItemText primary={voice.name} />
            </div>
            <ListItemSecondaryAction>
              <IconButton
                onClick={() => onButtonClick(index)}
                disabled={index === 0}
              >
                <PublishIcon color={index === 0 ? 'disabled' : 'action'} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

export default VoiceList;
