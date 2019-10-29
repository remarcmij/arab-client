import Menu from '@material-ui/core/Menu/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LOOK_UP, READ_ALOUD } from '../constants';
import { RootState } from '../reducers';
import SpeechSynthesizer from '../services/SpeechSynthesizer';

const mapStateToProps = (state: RootState) => ({
  voiceName: state.settings.voiceName,
});

type Props = {
  voiceName: string;
};

const WordClickHandler: React.FC<Props> = props => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { voiceName } = props;

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
          {READ_ALOUD}
        </MenuItem>
        <MenuItem onClick={searchWord}>{LOOK_UP}</MenuItem>
      </Menu>
    </>
  );
};

export default connect(mapStateToProps)(WordClickHandler);
