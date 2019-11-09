import Menu from '@material-ui/core/Menu/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../reducers';
import SpeechSynthesizer from '../services/SpeechSynthesizer';

const WordClickHandler: React.FC<{}> = props => {
  const history = useHistory();
  const { voiceName } = useSelector((state: RootState) => state.settings);
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const openMenu = (e: React.MouseEvent) => {
    const { target } = e;
    if (
      target instanceof HTMLElement &&
      target.tagName === 'SPAN' &&
      target.lang
    ) {
      setAnchorEl(target);
    }
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const speak = async () => {
    if (anchorEl instanceof HTMLElement) {
      const text = anchorEl.textContent!;
      closeMenu();
      await SpeechSynthesizer.speak(voiceName, text);
    }
  };

  const searchWord = () => {
    if (anchorEl instanceof HTMLElement) {
      const text = anchorEl.textContent!.replace(/[^\u0621-\u064a]/g, '');
      closeMenu();
      history.push(encodeURI(`/search?q=${text}`));
    }
  };

  return (
    <>
      <div onClick={openMenu}>{props.children}</div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem disabled={!voiceName} onClick={speak}>
          {t('read_aloud')}
        </MenuItem>
        <MenuItem onClick={searchWord}>{t('look_up')}</MenuItem>
      </Menu>
    </>
  );
};

export default WordClickHandler;
