import { createStyles, makeStyles, Theme } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import PublishIcon from '@material-ui/icons/Publish';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import Spinner from '../../../layout/components/Spinner';
import TrimmedContainer from '../../../layout/components/TrimmedContainer';
import { loadVoicesAsync, setEligibleVoices, IVoiceInfo } from '../actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grabbedItem: {
      cursor: 'grab',
      '&:hover': {
        outline: '1px dotted #CCC',
      },
    },
    textItem: {
      margin: theme.spacing(1),
    },
  }),
);

const VoicePreferences: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    settings: { eligibleVoices, loading, error },
    content: { publications },
  } = useSelector((state: RootState) => state);
  const [voices, setVoices] = useState<IVoiceInfo[]>([]);
  const [draggedItem, setDraggedItem] = useState<IVoiceInfo | null>(null);
  const classes = useStyles();

  useEffect(() => {
    dispatch(loadVoicesAsync(publications));
  }, [dispatch, publications]);

  useEffect(() => {
    setVoices([...eligibleVoices]);
  }, [eligibleVoices]);

  const onDragOver = (e: any, index: number) => {
    e.preventDefault();
    const draggedOverItem = voices[index];
    if (draggedItem === draggedOverItem) {
      return;
    }

    const reorderedVoices = voices.filter(item => item !== draggedItem);
    reorderedVoices.splice(index, 0, draggedItem!);
    setVoices(reorderedVoices);
  };

  const onDragStart = (e: any, index: number) => {
    setDraggedItem(voices[index]);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.parentNode);
  };

  const onDragEnd = () => {
    dispatch(setEligibleVoices(voices));
  };

  const onButtonClick = (index: number) => {
    const reorderedVoices = voices.filter((_, i) => i !== index);
    reorderedVoices.unshift(voices[index]);
    dispatch(setEligibleVoices(reorderedVoices));
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <TrimmedContainer>
        <Paper>{error.message}</Paper>
      </TrimmedContainer>
    );
  }

  return (
    <TrimmedContainer>
      <List
        subheader={
          <ListSubheader component="div">
            {t('voice_preferences_order')}
          </ListSubheader>
        }
      >
        {voices.map((voice, index) => (
          <ListItem
            key={voice.name}
            draggable={true}
            onDragOver={e => onDragOver(e, index)}
            onDragStart={e => onDragStart(e, index)}
            onDragEnd={onDragEnd}
            className={classes.grabbedItem}
          >
            <DragIndicatorIcon color="disabled" />
            <ListItemText
              primary={voice.name}
              secondary={voice.lang}
              className={classes.textItem}
            />
            <ListItemSecondaryAction>
              <IconButton
                onClick={() => onButtonClick(index)}
                disabled={index === 0}
              >
                <PublishIcon color={index === 0 ? 'disabled' : 'action'} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </TrimmedContainer>
  );
};

export default VoicePreferences;
