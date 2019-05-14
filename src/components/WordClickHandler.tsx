import Menu from '@material-ui/core/Menu/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { useSettingsContext } from '../contexts/settings/SettingsProvider';
import SpeechSynthesizer from '../services/SpeechSynthesizer';
import * as C from './constants';

const WordClickHandler: React.FC<RouteComponentProps> = props => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { settings } = useSettingsContext();

  const { voiceName } = settings;

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

  const speak = () => {
    if (anchorEl instanceof HTMLElement) {
      const text = anchorEl.textContent!;
      closeMenu();
      // tslint:disable-next-line:no-floating-promises
      SpeechSynthesizer.speak(voiceName, text);
    }
  };

  const searchWord = () => {
    if (anchorEl instanceof HTMLElement) {
      const text = anchorEl.textContent!.replace(/[^\u0621-\u064a]/g, '');
      closeMenu();
      props.history.push(encodeURI(`/search?q=${text}`));
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
          {C.READ_ALOUD}
        </MenuItem>
        <MenuItem onClick={searchWord}>{C.LOOK_UP}</MenuItem>
      </Menu>
    </>
  );
};

export default withRouter(WordClickHandler);
